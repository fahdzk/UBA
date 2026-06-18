import { PrismaClient, RoleName, UserStatus, MembershipTier, SubscriptionStatus, ComplaintStatus, ComplaintPriority, TicketStatus, TicketPriority, LegalCaseStatus, PaymentStatus, ApplicationStatus, EmailStatus, AuditAction, NotificationType, EvidenceVisibility } from "@prisma/client";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding UBA database...");

  // ============================================================
  // ROLES & PERMISSIONS
  // ============================================================
  console.log("Creating roles and permissions...");

  const roleDefinitions: { name: RoleName; description: string; permissions: { resource: string; action: string }[] }[] = [
    {
      name: RoleName.SUPER_ADMIN,
      description: "Full system access — can manage all users, settings, and data",
      permissions: [
        { resource: "*", action: "*" },
      ],
    },
    {
      name: RoleName.ADMIN,
      description: "Administrative access — can manage users, complaints, tickets",
      permissions: [
        { resource: "users", action: "read" },
        { resource: "users", action: "update" },
        { resource: "users", action: "suspend" },
        { resource: "complaints", action: "*" },
        { resource: "tickets", action: "*" },
        { resource: "legal_cases", action: "read" },
        { resource: "legal_cases", action: "update" },
        { resource: "news", action: "*" },
        { resource: "analytics", action: "read" },
        { resource: "audit_logs", action: "read" },
      ],
    },
    {
      name: RoleName.MODERATOR,
      description: "Content moderation — can manage complaints and tickets",
      permissions: [
        { resource: "complaints", action: "read" },
        { resource: "complaints", action: "update" },
        { resource: "tickets", action: "read" },
        { resource: "tickets", action: "update" },
        { resource: "agency_reviews", action: "moderate" },
      ],
    },
    {
      name: RoleName.AGENCY_ADMIN,
      description: "Agency owner — can manage agency profile, post jobs, review applications",
      permissions: [
        { resource: "agency_profile", action: "read" },
        { resource: "agency_profile", action: "update" },
        { resource: "jobs", action: "*" },
        { resource: "applications", action: "read" },
        { resource: "applications", action: "update" },
        { resource: "agency_reviews", action: "read" },
      ],
    },
    {
      name: RoleName.AGENCY_STAFF,
      description: "Agency staff — limited agency management",
      permissions: [
        { resource: "agency_profile", action: "read" },
        { resource: "jobs", action: "read" },
        { resource: "jobs", action: "create" },
        { resource: "applications", action: "read" },
      ],
    },
    {
      name: RoleName.LAWYER,
      description: "Legal professional — can manage legal cases and evidence",
      permissions: [
        { resource: "lawyer_profile", action: "read" },
        { resource: "lawyer_profile", action: "update" },
        { resource: "legal_cases", action: "read" },
        { resource: "legal_cases", action: "update" },
        { resource: "case_notes", action: "*" },
        { resource: "documents", action: "read" },
        { resource: "documents", action: "create" },
      ],
    },
    {
      name: RoleName.BA,
      description: "Brand Ambassador — can manage profile, file complaints, apply to jobs",
      permissions: [
        { resource: "ba_profile", action: "read" },
        { resource: "ba_profile", action: "update" },
        { resource: "complaints", action: "create" },
        { resource: "complaints", action: "read" },
        { resource: "jobs", action: "read" },
        { resource: "applications", action: "create" },
        { resource: "applications", action: "read" },
        { resource: "agency_reviews", action: "create" },
        { resource: "agency_reviews", action: "read" },
      ],
    },
    {
      name: RoleName.GUEST,
      description: "Unauthenticated visitor — read-only public content",
      permissions: [
        { resource: "news", action: "read" },
        { resource: "public_profiles", action: "read" },
      ],
    },
  ];

  for (const roleDef of roleDefinitions) {
    const role = await prisma.role.upsert({
      where: { name: roleDef.name },
      update: {},
      create: {
        name: roleDef.name,
        description: roleDef.description,
      },
    });

    for (const perm of roleDef.permissions) {
      await prisma.permission.upsert({
        where: {
          roleId_resource_action: {
            roleId: role.id,
            resource: perm.resource,
            action: perm.action,
          },
        },
        update: {},
        create: {
          roleId: role.id,
          resource: perm.resource,
          action: perm.action,
        },
      });
    }
  }

  // ============================================================
  // USERS
  // ============================================================
  console.log("Creating users...");

  const superAdmin = await prisma.user.upsert({
    where: { email: "superadmin@uba.com" },
    update: {},
    create: {
      id: "usr_superadmin_001",
      clerkId: "clerk_sa_" + randomUUID(),
      email: "superadmin@uba.com",
      firstName: "Alexandra",
      lastName: "Chen",
      status: UserStatus.ACTIVE,
      mfaEnabled: true,
      lastLoginAt: new Date(),
      lastLoginIp: "192.168.1.100",
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: "admin@uba.com" },
    update: {},
    create: {
      id: "usr_admin_001",
      clerkId: "clerk_ad_" + randomUUID(),
      email: "admin@uba.com",
      firstName: "Marcus",
      lastName: "Johnson",
      status: UserStatus.ACTIVE,
      mfaEnabled: true,
      lastLoginAt: new Date(),
      lastLoginIp: "192.168.1.101",
    },
  });

  const moderator = await prisma.user.upsert({
    where: { email: "moderator@uba.com" },
    update: {},
    create: {
      id: "usr_mod_001",
      clerkId: "clerk_mod_" + randomUUID(),
      email: "moderator@uba.com",
      firstName: "Sarah",
      lastName: "Williams",
      status: UserStatus.ACTIVE,
      lastLoginAt: new Date(),
    },
  });

  // BAs
  const baUsers = await Promise.all([
    prisma.user.upsert({
      where: { email: "james.wilson@email.com" },
      update: {},
      create: {
        id: "usr_ba_001",
        clerkId: "clerk_ba1_" + randomUUID(),
        email: "james.wilson@email.com",
        firstName: "James",
        lastName: "Wilson",
        status: UserStatus.ACTIVE,
        lastLoginAt: new Date(),
      },
    }),
    prisma.user.upsert({
      where: { email: "maria.garcia@email.com" },
      update: {},
      create: {
        id: "usr_ba_002",
        clerkId: "clerk_ba2_" + randomUUID(),
        email: "maria.garcia@email.com",
        firstName: "Maria",
        lastName: "Garcia",
        status: UserStatus.ACTIVE,
        lastLoginAt: new Date(),
      },
    }),
    prisma.user.upsert({
      where: { email: "david.kim@email.com" },
      update: {},
      create: {
        id: "usr_ba_003",
        clerkId: "clerk_ba3_" + randomUUID(),
        email: "david.kim@email.com",
        firstName: "David",
        lastName: "Kim",
        status: UserStatus.ACTIVE,
        lastLoginAt: new Date(),
      },
    }),
    prisma.user.upsert({
      where: { email: "aisha.patel@email.com" },
      update: {},
      create: {
        id: "usr_ba_004",
        clerkId: "clerk_ba4_" + randomUUID(),
        email: "aisha.patel@email.com",
        firstName: "Aisha",
        lastName: "Patel",
        status: UserStatus.SUSPENDED,
        suspendedAt: new Date("2026-05-15"),
        suspensionReason: "Multiple unresolved complaints",
        lastLoginAt: new Date("2026-05-14"),
      },
    }),
  ]);

  // Agency users
  const agencyUsers = await Promise.all([
    prisma.user.upsert({
      where: { email: "contact@staffpro.com" },
      update: {},
      create: {
        id: "usr_agency_001",
        clerkId: "clerk_ag1_" + randomUUID(),
        email: "contact@staffpro.com",
        firstName: "Robert",
        lastName: "Martinez",
        status: UserStatus.ACTIVE,
        lastLoginAt: new Date(),
      },
    }),
    prisma.user.upsert({
      where: { email: "hr@elitestaffing.com" },
      update: {},
      create: {
        id: "usr_agency_002",
        clerkId: "clerk_ag2_" + randomUUID(),
        email: "hr@elitestaffing.com",
        firstName: "Jennifer",
        lastName: "Lee",
        status: UserStatus.ACTIVE,
        lastLoginAt: new Date(),
      },
    }),
    prisma.user.upsert({
      where: { email: "admin@quicktemp.com" },
      update: {},
      create: {
        id: "usr_agency_003",
        clerkId: "clerk_ag3_" + randomUUID(),
        email: "admin@quicktemp.com",
        firstName: "Thomas",
        lastName: "Brown",
        status: UserStatus.ACTIVE,
        lastLoginAt: new Date(),
      },
    }),
  ]);

  const lawyerUsers = await Promise.all([
    prisma.user.upsert({
      where: { email: "lawyer@employmentlaw.com" },
      update: {},
      create: {
        id: "usr_lawyer_001",
        clerkId: "clerk_lw1_" + randomUUID(),
        email: "lawyer@employmentlaw.com",
        firstName: "Patricia",
        lastName: "Nguyen",
        status: UserStatus.ACTIVE,
        lastLoginAt: new Date(),
      },
    }),
    prisma.user.upsert({
      where: { email: "counsel@workersrights.com" },
      update: {},
      create: {
        id: "usr_lawyer_002",
        clerkId: "clerk_lw2_" + randomUUID(),
        email: "counsel@workersrights.com",
        firstName: "Michael",
        lastName: "Thompson",
        status: UserStatus.ACTIVE,
        lastLoginAt: new Date(),
      },
    }),
  ]);

  // Create lawyer profiles and capture them for later use
  const lawyerProfiles = await Promise.all([
    prisma.lawyerProfile.upsert({
      where: { userId: lawyerUsers[0].id },
      update: {},
      create: {
        userId: lawyerUsers[0].id,
        barNumber: "CA-BAR-201456",
        firmName: "Nguyen & Associates",
        specialties: ["Employment Law", "Labor Rights", "Workplace Harassment"],
        jurisdiction: ["CA", "NY", "Federal"],
        yearsExperience: 12,
        bio: "Patricia Nguyen is a seasoned employment law attorney with over 12 years of experience advocating for workers' rights. She has successfully represented hundreds of cases involving wage theft, workplace discrimination, and wrongful termination.",
        city: "San Francisco",
        state: "CA",
        phone: "+1-555-0201",
        verified: true,
        verifiedAt: new Date("2025-02-01"),
        rating: 4.9,
        totalCases: 156,
        successfulCases: 134,
        hourlyRate: 350,
      },
    }),
    prisma.lawyerProfile.upsert({
      where: { userId: lawyerUsers[1].id },
      update: {},
      create: {
        userId: lawyerUsers[1].id,
        barNumber: "NY-BAR-789012",
        firmName: "Workers Rights Legal Group",
        specialties: ["Labor Law", "Class Action", "Wage & Hour"],
        jurisdiction: ["NY", "NJ", "Federal"],
        yearsExperience: 8,
        bio: "Michael Thompson specializes in labor law and class action lawsuits. He has recovered over $50M in unpaid wages for workers.",
        city: "New York",
        state: "NY",
        phone: "+1-555-0202",
        verified: true,
        verifiedAt: new Date("2025-04-10"),
        rating: 4.7,
        totalCases: 89,
        successfulCases: 72,
        hourlyRate: 400,
      },
    }),
  ]);

  // ============================================================
  // ASSIGN ROLES
  // ============================================================
  console.log("Assigning roles...");

  const roles = await prisma.role.findMany();

  const getRoleId = (name: RoleName) => roles.find(r => r.name === name)!.id;

  await prisma.userRole.createMany({
    data: [
      { userId: superAdmin.id, roleId: getRoleId(RoleName.SUPER_ADMIN) },
      { userId: admin.id, roleId: getRoleId(RoleName.ADMIN) },
      { userId: moderator.id, roleId: getRoleId(RoleName.MODERATOR) },
      { userId: baUsers[0].id, roleId: getRoleId(RoleName.BA) },
      { userId: baUsers[1].id, roleId: getRoleId(RoleName.BA) },
      { userId: baUsers[2].id, roleId: getRoleId(RoleName.BA) },
      { userId: baUsers[3].id, roleId: getRoleId(RoleName.BA) },
      { userId: agencyUsers[0].id, roleId: getRoleId(RoleName.AGENCY_ADMIN) },
      { userId: agencyUsers[1].id, roleId: getRoleId(RoleName.AGENCY_ADMIN) },
      { userId: agencyUsers[2].id, roleId: getRoleId(RoleName.AGENCY_ADMIN) },
      { userId: lawyerUsers[0].id, roleId: getRoleId(RoleName.LAWYER) },
      { userId: lawyerUsers[1].id, roleId: getRoleId(RoleName.LAWYER) },
    ],
    skipDuplicates: true,
  });

  // ============================================================
  // PROFILES
  // ============================================================
  console.log("Creating profiles...");

  await Promise.all([
    prisma.baProfile.upsert({
      where: { userId: baUsers[0].id },
      update: {},
      create: {
        userId: baUsers[0].id,
        unionLocal: "Local 407",
        city: "Los Angeles",
        state: "CA",
        specialties: ["Event Staffing", "Product Demo", "Trade Shows"],
        yearsExperience: 5,
        bio: "Experienced brand ambassador with 5+ years in event staffing and product demonstrations. Worked with major brands at CES, E3, and Coachella.",
        availability: true,
        verified: true,
        rating: 4.8,
        totalReviews: 23,
      },
    }),
    prisma.baProfile.upsert({
      where: { userId: baUsers[1].id },
      update: {},
      create: {
        userId: baUsers[1].id,
        unionLocal: "Local 211",
        city: "New York",
        state: "NY",
        specialties: ["Retail Sampling", "In-Store Promotions", "Brand Activations"],
        yearsExperience: 3,
        bio: "Passionate about connecting brands with consumers through memorable in-store experiences.",
        availability: true,
        verified: true,
        rating: 4.5,
        totalReviews: 15,
      },
    }),
    prisma.baProfile.upsert({
      where: { userId: baUsers[2].id },
      update: {},
      create: {
        userId: baUsers[2].id,
        city: "Chicago",
        state: "IL",
        specialties: ["Trade Shows", "Corporate Events"],
        yearsExperience: 7,
        bio: "Senior brand ambassador specializing in corporate events and trade show management.",
        availability: false,
        verified: true,
        rating: 4.9,
        totalReviews: 41,
      },
    }),
    prisma.baProfile.upsert({
      where: { userId: baUsers[3].id },
      update: {},
      create: {
        userId: baUsers[3].id,
        city: "Miami",
        state: "FL",
        specialties: ["Event Staffing"],
        yearsExperience: 2,
        bio: "New to the industry but eager to learn and grow.",
        availability: false,
        verified: false,
        rating: 3.2,
        totalReviews: 4,
      },
    }),
  ]);

  await Promise.all([
    prisma.agencyProfile.upsert({
      where: { userId: agencyUsers[0].id },
      update: {},
      create: {
        userId: agencyUsers[0].id,
        companyName: "StaffPro Solutions",
        slug: "staffpro-solutions",
        website: "https://staffpro.com",
        description: "Premium staffing agency specializing in brand ambassadors and event staff for Fortune 500 companies.",
        city: "Los Angeles",
        state: "CA",
        phone: "+1-555-0101",
        taxId: "12-3456789",
        verified: true,
        verifiedAt: new Date("2025-01-15"),
        riskScore: 15,
        rating: 4.7,
        totalReviews: 89,
      },
    }),
    prisma.agencyProfile.upsert({
      where: { userId: agencyUsers[1].id },
      update: {},
      create: {
        userId: agencyUsers[1].id,
        companyName: "Elite Staffing Group",
        slug: "elite-staffing-group",
        website: "https://elitestaffing.com",
        description: "Full-service staffing solutions for retail, events, and corporate environments.",
        city: "New York",
        state: "NY",
        phone: "+1-555-0102",
        taxId: "98-7654321",
        verified: true,
        verifiedAt: new Date("2025-03-20"),
        riskScore: 25,
        rating: 4.3,
        totalReviews: 56,
      },
    }),
    prisma.agencyProfile.upsert({
      where: { userId: agencyUsers[2].id },
      update: {},
      create: {
        userId: agencyUsers[2].id,
        companyName: "QuickTemp Staffing",
        slug: "quicktemp-staffing",
        description: "Fast-turnaround temporary staffing for events and promotions.",
        city: "Chicago",
        state: "IL",
        phone: "+1-555-0103",
        verified: false,
        riskScore: 65,
        rating: 3.1,
        totalReviews: 12,
      },
    }),
  ]);

  // ============================================================
  // MEMBERSHIPS & SUBSCRIPTIONS
  // ============================================================
  console.log("Creating memberships and subscriptions...");

  const memberships = await Promise.all([
    prisma.membership.create({
      data: {
        userId: baUsers[0].id,
        tier: MembershipTier.BA_MONTHLY,
        startDate: new Date("2025-06-01"),
        endDate: new Date("2026-06-30"),
        autoRenew: true,
      },
    }),
    prisma.membership.create({
      data: {
        userId: baUsers[1].id,
        tier: MembershipTier.BA_YEARLY,
        startDate: new Date("2025-01-15"),
        endDate: new Date("2026-01-14"),
        autoRenew: true,
      },
    }),
    prisma.membership.create({
      data: {
        userId: agencyUsers[0].id,
        tier: MembershipTier.AGENCY_VERIFIED,
        startDate: new Date("2025-01-15"),
        endDate: new Date("2026-07-15"),
        autoRenew: true,
      },
    }),
    prisma.membership.create({
      data: {
        userId: agencyUsers[1].id,
        tier: MembershipTier.BRAND_PARTNER,
        startDate: new Date("2025-03-01"),
        endDate: new Date("2026-09-01"),
        autoRenew: true,
      },
    }),
  ]);

  await Promise.all([
    prisma.subscription.create({
      data: {
        userId: baUsers[0].id,
        membershipId: memberships[0].id,
        stripeSubscriptionId: "sub_ba_monthly_001",
        stripeCustomerId: "cus_ba_001",
        stripePriceId: "price_ba_monthly_10",
        status: SubscriptionStatus.ACTIVE,
        currentPeriodStart: new Date("2025-06-01"),
        currentPeriodEnd: new Date("2026-06-30"),
      },
    }),
    prisma.subscription.create({
      data: {
        userId: baUsers[1].id,
        membershipId: memberships[1].id,
        stripeSubscriptionId: "sub_ba_yearly_001",
        stripeCustomerId: "cus_ba_002",
        stripePriceId: "price_ba_yearly_100",
        status: SubscriptionStatus.ACTIVE,
        currentPeriodStart: new Date("2025-01-15"),
        currentPeriodEnd: new Date("2026-01-14"),
      },
    }),
    prisma.subscription.create({
      data: {
        userId: agencyUsers[0].id,
        membershipId: memberships[2].id,
        stripeSubscriptionId: "sub_agency_001",
        stripeCustomerId: "cus_agency_001",
        stripePriceId: "price_agency_99",
        status: SubscriptionStatus.ACTIVE,
        currentPeriodStart: new Date("2025-01-15"),
        currentPeriodEnd: new Date("2026-07-15"),
      },
    }),
    prisma.subscription.create({
      data: {
        userId: agencyUsers[1].id,
        membershipId: memberships[3].id,
        stripeSubscriptionId: "sub_brand_001",
        stripeCustomerId: "cus_agency_002",
        stripePriceId: "price_brand_499",
        status: SubscriptionStatus.ACTIVE,
        currentPeriodStart: new Date("2025-03-01"),
        currentPeriodEnd: new Date("2026-09-01"),
      },
    }),
  ]);

  // ============================================================
  // PAYMENTS
  // ============================================================
  console.log("Creating payments...");

  await prisma.payment.createMany({
    data: [
      {
        userId: baUsers[0].id,
        stripePaymentId: "pi_001",
        stripeInvoiceId: "in_001",
        amount: 1000,
        currency: "usd",
        status: PaymentStatus.SUCCEEDED,
        paymentMethod: "card",
        description: "BA Monthly Membership",
        receiptUrl: "https://pay.stripe.com/receipts/001",
      },
      {
        userId: baUsers[1].id,
        stripePaymentId: "pi_002",
        stripeInvoiceId: "in_002",
        amount: 10000,
        currency: "usd",
        status: PaymentStatus.SUCCEEDED,
        paymentMethod: "card",
        description: "BA Yearly Membership",
        receiptUrl: "https://pay.stripe.com/receipts/002",
      },
      {
        userId: agencyUsers[0].id,
        stripePaymentId: "pi_003",
        stripeInvoiceId: "in_003",
        amount: 9900,
        currency: "usd",
        status: PaymentStatus.SUCCEEDED,
        paymentMethod: "bank_transfer",
        description: "Agency Verified Monthly",
        receiptUrl: "https://pay.stripe.com/receipts/003",
      },
      {
        userId: agencyUsers[1].id,
        stripePaymentId: "pi_004",
        stripeInvoiceId: "in_004",
        amount: 49900,
        currency: "usd",
        status: PaymentStatus.SUCCEEDED,
        paymentMethod: "bank_transfer",
        description: "Brand Partner Monthly",
        receiptUrl: "https://pay.stripe.com/receipts/004",
      },
      {
        userId: baUsers[2].id,
        stripePaymentId: "pi_005",
        amount: 1000,
        currency: "usd",
        status: PaymentStatus.FAILED,
        paymentMethod: "card",
        description: "BA Monthly Membership",
        failureReason: "Card declined",
      },
    ],
  });

  // ============================================================
  // JOBS
  // ============================================================
  console.log("Creating jobs...");

  const jobs = await Promise.all([
    prisma.job.create({
      data: {
        agencyId: (await prisma.agencyProfile.findUnique({ where: { userId: agencyUsers[0].id } }))!.id,
        title: "Brand Ambassador - Tech Conference 2026",
        description: "We're seeking enthusiastic brand ambassadors for a major tech conference in San Francisco. Responsibilities include product demonstrations, lead generation, and brand representation.\n\nRequirements:\n- Previous event staffing experience\n- Professional appearance\n- Excellent communication skills\n- Available for 3-day event",
        location: "Moscone Center, San Francisco",
        city: "San Francisco",
        state: "CA",
        jobType: "EVENT",
        rate: "$35/hour",
        startDate: new Date("2026-07-15"),
        endDate: new Date("2026-07-17"),
        requirements: ["Event experience", "Professional appearance", "Communication skills"],
        status: "OPEN",
        views: 234,
      },
    }),
    prisma.job.create({
      data: {
        agencyId: (await prisma.agencyProfile.findUnique({ where: { userId: agencyUsers[0].id } }))!.id,
        title: "Retail Sampling Specialist",
        description: "Join our team for in-store product sampling at major retail locations. Engage with customers, distribute samples, and collect feedback.",
        location: "Multiple Locations, Los Angeles",
        city: "Los Angeles",
        state: "CA",
        jobType: "PART_TIME",
        rate: "$25/hour",
        startDate: new Date("2026-07-01"),
        requirements: ["Retail experience", "Customer service", "Reliable transportation"],
        status: "OPEN",
        views: 156,
      },
    }),
    prisma.job.create({
      data: {
        agencyId: (await prisma.agencyProfile.findUnique({ where: { userId: agencyUsers[1].id } }))!.id,
        title: "Corporate Event Staff - Gala",
        description: "Premium staffing for an exclusive corporate gala. Black-tie event requiring professional demeanor and experience in high-end hospitality.",
        location: "The Plaza, New York",
        city: "New York",
        state: "NY",
        jobType: "EVENT",
        rate: "$50/hour",
        startDate: new Date("2026-08-20"),
        endDate: new Date("2026-08-20"),
        requirements: ["Formal event experience", "Hospitality background", "Professional attire"],
        status: "OPEN",
        views: 89,
      },
    }),
    prisma.job.create({
      data: {
        agencyId: (await prisma.agencyProfile.findUnique({ where: { userId: agencyUsers[1].id } }))!.id,
        title: "Brand Ambassador - Product Launch",
        description: "Be part of an exciting new product launch campaign. Street team activations across Manhattan.",
        location: "Manhattan, New York",
        city: "New York",
        state: "NY",
        jobType: "CONTRACT",
        rate: "$200/day",
        startDate: new Date("2026-07-10"),
        endDate: new Date("2026-07-12"),
        requirements: ["Street marketing", "Social media savvy", "Energetic personality"],
        status: "FILLED",
        views: 312,
      },
    }),
  ]);

  // ============================================================
  // APPLICATIONS
  // ============================================================
  console.log("Creating applications...");

  await prisma.application.createMany({
    data: [
      {
        jobId: jobs[0].id,
        userId: baUsers[0].id,
        coverLetter: "I have extensive experience at tech conferences including CES and Google I/O. I'd love to bring my expertise to your event.",
        status: ApplicationStatus.SHORTLISTED,
        reviewedAt: new Date(),
      },
      {
        jobId: jobs[0].id,
        userId: baUsers[1].id,
        coverLetter: "As a seasoned brand ambassador, I've worked with major tech brands and understand the importance of representing products professionally.",
        status: ApplicationStatus.PENDING,
      },
      {
        jobId: jobs[1].id,
        userId: baUsers[0].id,
        coverLetter: "I have retail sampling experience with beauty and food brands. Available immediately.",
        status: ApplicationStatus.ACCEPTED,
        reviewedAt: new Date(),
      },
      {
        jobId: jobs[2].id,
        userId: baUsers[1].id,
        coverLetter: "I've staffed numerous high-end galas and corporate events in NYC. References available upon request.",
        status: ApplicationStatus.REVIEWING,
      },
      {
        jobId: jobs[3].id,
        userId: baUsers[2].id,
        coverLetter: "Street team specialist with 7 years of experience in product launches.",
        status: ApplicationStatus.ACCEPTED,
        reviewedAt: new Date(),
      },
    ],
  });

  // ============================================================
  // REVIEWS
  // ============================================================
  console.log("Creating reviews...");

  const staffPro = await prisma.agencyProfile.findUnique({ where: { slug: "staffpro-solutions" } });
  const eliteStaff = await prisma.agencyProfile.findUnique({ where: { slug: "elite-staffing-group" } });

  await prisma.agencyReview.createMany({
    data: [
      {
        agencyId: staffPro!.id,
        authorId: baUsers[0].id,
        rating: 5,
        title: "Excellent agency to work with",
        body: "StaffPro has been fantastic. They communicate clearly, pay on time, and always have interesting assignments. Highly recommend!",
        isVerified: true,
        isVisible: true,
      },
      {
        agencyId: staffPro!.id,
        authorId: baUsers[1].id,
        rating: 4,
        title: "Great experience overall",
        body: "Professional team with good opportunities. Only minor issue was scheduling communication could be faster.",
        isVerified: true,
        isVisible: true,
      },
      {
        agencyId: eliteStaff!.id,
        authorId: baUsers[0].id,
        rating: 4,
        title: "Reliable and professional",
        body: "Elite Staffing provides consistent work opportunities. Payment is always on time.",
        isVerified: true,
        isVisible: true,
      },
      {
        agencyId: eliteStaff!.id,
        authorId: baUsers[2].id,
        rating: 3,
        title: "Decent but could improve",
        body: "The work is fine but sometimes the job descriptions don't match reality. Communication could be better.",
        isVerified: true,
        isVisible: true,
      },
    ],
  });

  // ============================================================
  // COMPLAINTS & TICKETS
  // ============================================================
  console.log("Creating complaints and tickets...");

  const complaint1 = await prisma.complaint.create({
    data: {
      complainantId: baUsers[0].id,
      respondentId: agencyUsers[2].id,
      title: "Unpaid wages for completed event work",
      description: "I completed a 3-day event assignment for QuickTemp Staffing from May 1-3, 2026. Despite submitting my timesheets and receiving confirmation of hours worked, I have not received payment of $840. Multiple emails and calls have gone unanswered for over 3 weeks.",
      category: "Wage Theft",
      priority: ComplaintPriority.HIGH,
      status: ComplaintStatus.INVESTIGATING,
      assignedAdminId: admin.id,
    },
  });

  const complaint2 = await prisma.complaint.create({
    data: {
      complainantId: baUsers[1].id,
      respondentId: agencyUsers[2].id,
      title: "Unsafe working conditions at retail location",
      description: "During a sampling event, the store management refused to provide adequate breaks and the display setup was unsafe. When I raised concerns, the agency representative told me to 'deal with it or leave.'",
      category: "Workplace Safety",
      priority: ComplaintPriority.MEDIUM,
      status: ComplaintStatus.OPEN,
    },
  });

  const complaint3 = await prisma.complaint.create({
    data: {
      complainantId: baUsers[2].id,
      respondentId: agencyUsers[1].id,
      title: "Discrimination based on age",
      description: "I was passed over for multiple assignments despite having the highest rating. Younger, less experienced BAs were selected. When I asked why, the coordinator said they were looking for a 'younger vibe.'",
      category: "Discrimination",
      priority: ComplaintPriority.CRITICAL,
      status: ComplaintStatus.ESCALATED,
      assignedAdminId: admin.id,
    },
  });

  // Tickets
  const ticket1 = await prisma.ticket.create({
    data: {
      complaintId: complaint1.id,
      createdById: admin.id,
      assignedToId: admin.id,
      ticketNumber: "TKT-2026-0001",
      subject: "Unpaid wages - QuickTemp Staffing",
      description: "BA James Wilson reports $840 in unpaid wages for event work completed May 1-3.",
      priority: TicketPriority.HIGH,
      status: TicketStatus.IN_PROGRESS,
      category: "Wage Theft",
      slaDeadline: new Date("2026-07-01"),
      firstResponseAt: new Date("2026-06-10"),
    },
  });

  const ticket2 = await prisma.ticket.create({
    data: {
      complaintId: complaint3.id,
      createdById: admin.id,
      assignedToId: moderator.id,
      ticketNumber: "TKT-2026-0002",
      subject: "Age discrimination complaint - Elite Staffing",
      description: "BA David Kim alleges age discrimination in assignment selection.",
      priority: TicketPriority.URGENT,
      status: TicketStatus.IN_PROGRESS,
      category: "Discrimination",
      slaDeadline: new Date("2026-06-25"),
      firstResponseAt: new Date("2026-06-16"),
    },
  });

  // Messages in tickets
  await prisma.message.createMany({
    data: [
      {
        ticketId: ticket1.id,
        senderId: admin.id,
        recipientId: baUsers[0].id,
        content: "Thank you for filing this complaint. We've opened an investigation and will contact QuickTemp Staffing directly. Can you provide your timesheets and any email confirmations?",
      },
      {
        ticketId: ticket1.id,
        senderId: baUsers[0].id,
        recipientId: admin.id,
        content: "Yes, I've attached my timesheets and the email confirmation from the event coordinator. The total is 24 hours at $35/hour.",
        readAt: new Date(),
      },
      {
        ticketId: ticket1.id,
        senderId: admin.id,
        recipientId: baUsers[0].id,
        content: "Received. We've contacted QuickTemp and given them 48 hours to respond. We'll keep you updated.",
      },
      {
        ticketId: ticket2.id,
        senderId: admin.id,
        recipientId: baUsers[2].id,
        content: "This is a serious allegation. We're escalating this to our legal team. Can you provide specific dates and the names of the BAs who were selected over you?",
      },
    ],
  });

  // ============================================================
  // LEGAL CASES
  // ============================================================
  console.log("Creating legal cases...");

  const legalCase1 = await prisma.legalCase.create({
    data: {
      complaintId: complaint1.id,
      baId: baUsers[0].id,
      lawyerId: lawyerProfiles[0].id,
      caseNumber: "CASE-2026-0001",
      title: "Wilson v. QuickTemp Staffing - Wage Theft",
      description: "Legal case for unpaid wages totaling $840 for event work completed May 1-3, 2026. Evidence includes timesheets, email confirmations, and witness statements.",
      status: LegalCaseStatus.EVIDENCE_GATHERING,
      isConfidential: true,
    },
  });

  const legalCase2 = await prisma.legalCase.create({
    data: {
      complaintId: complaint3.id,
      baId: baUsers[2].id,
      lawyerId: lawyerProfiles[1].id,
      caseNumber: "CASE-2026-0002",
      title: "Kim v. Elite Staffing Group - Age Discrimination",
      description: "Age discrimination case under ADEA. Client alleges systematic preference for younger BAs despite superior qualifications and ratings.",
      status: LegalCaseStatus.LEGAL_REVIEW,
      isConfidential: true,
    },
  });

  // Case notes
  await prisma.caseNote.createMany({
    data: [
      {
        caseId: legalCase1.id,
        authorId: lawyerUsers[0].id,
        content: "Initial review complete. Strong case - client has documented timesheets and email confirmation. Recommend sending demand letter to QuickTemp before filing suit.",
        isPrivate: false,
      },
      {
        caseId: legalCase1.id,
        authorId: lawyerUsers[0].id,
        content: "Demand letter sent via certified mail on June 12. 30-day response window. Will follow up if no response by July 12.",
        isPrivate: false,
      },
      {
        caseId: legalCase2.id,
        authorId: lawyerUsers[1].id,
        content: "Reviewed assignment records provided by client. Pattern is concerning - client was passed over for 5 consecutive assignments in favor of less qualified candidates. Need to request agency's internal selection criteria.",
        isPrivate: true,
      },
    ],
  });

  // ============================================================
  // DOCUMENTS
  // ============================================================
  console.log("Creating documents...");

  await prisma.document.createMany({
    data: [
      {
        uploaderId: baUsers[0].id,
        complaintId: complaint1.id,
        legalCaseId: legalCase1.id,
        fileName: "timesheets_may2026.pdf",
        originalName: "Timesheets - May 2026.pdf",
        fileType: "application/pdf",
        fileSize: 245000,
        storageKey: "evidence/usr_ba_001/timesheets_may2026.pdf",
        storageBucket: "uba-evidence",
        visibility: EvidenceVisibility.RESTRICTED,
        malwareStatus: "CLEAN",
        checksum: "sha256:a1b2c3d4e5f6...",
      },
      {
        uploaderId: baUsers[0].id,
        complaintId: complaint1.id,
        legalCaseId: legalCase1.id,
        fileName: "email_confirmation.png",
        originalName: "Email Confirmation.png",
        fileType: "image/png",
        fileSize: 128000,
        storageKey: "evidence/usr_ba_001/email_confirmation.png",
        storageBucket: "uba-evidence",
        visibility: EvidenceVisibility.RESTRICTED,
        malwareStatus: "CLEAN",
        checksum: "sha256:f6e5d4c3b2a1...",
      },
      {
        uploaderId: baUsers[2].id,
        complaintId: complaint3.id,
        legalCaseId: legalCase2.id,
        fileName: "assignment_history.xlsx",
        originalName: "Assignment History.xlsx",
        fileType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        fileSize: 89000,
        storageKey: "evidence/usr_ba_003/assignment_history.xlsx",
        storageBucket: "uba-evidence",
        visibility: EvidenceVisibility.AUTHORIZED_ONLY,
        malwareStatus: "CLEAN",
        checksum: "sha256:1a2b3c4d5e6f...",
      },
    ],
  });

  // ============================================================
  // NOTIFICATIONS
  // ============================================================
  console.log("Creating notifications...");

  await prisma.notification.createMany({
    data: [
      {
        userId: baUsers[0].id,
        type: NotificationType.COMPLAINT_UPDATE,
        title: "Complaint Update",
        body: "Your complaint against QuickTemp Staffing has been assigned to an investigator.",
      },
      {
        userId: baUsers[0].id,
        type: NotificationType.LEGAL_CASE,
        title: "Lawyer Assigned",
        body: "Attorney Patricia Nguyen has been assigned to your case.",
        readAt: new Date(),
      },
      {
        userId: baUsers[2].id,
        type: NotificationType.COMPLAINT_UPDATE,
        title: "Complaint Escalated",
        body: "Your discrimination complaint has been escalated to our legal team.",
      },
      {
        userId: admin.id,
        type: NotificationType.SYSTEM,
        title: "New Critical Complaint",
        body: "A new critical priority complaint has been filed and requires immediate attention.",
      },
      {
        userId: agencyUsers[2].id,
        type: NotificationType.SECURITY,
        title: "Complaint Filed Against Your Agency",
        body: "A complaint has been filed against QuickTemp Staffing. Please respond within 48 hours.",
      },
    ],
  });

  // ============================================================
  // NEWS POSTS
  // ============================================================
  console.log("Creating news posts...");

  await prisma.newsPost.createMany({
    data: [
      {
        authorId: superAdmin.id,
        title: "UBA Launches New Legal Protection Program for Brand Ambassadors",
        slug: "uba-launches-legal-protection-program",
        excerpt: "Our new program provides free legal consultation and representation for BAs facing workplace issues.",
        content: "# UBA Legal Protection Program\n\nWe're proud to announce the launch of our comprehensive legal protection program...",
        tags: ["Legal", "Protection", "Announcement"],
        published: true,
        publishedAt: new Date("2026-06-01"),
        featured: true,
        views: 1250,
      },
      {
        authorId: admin.id,
        title: "Know Your Rights: Wage Theft Prevention Guide",
        slug: "know-your-rights-wage-theft-prevention",
        excerpt: "A comprehensive guide to understanding and preventing wage theft in the brand ambassador industry.",
        content: "# Know Your Rights: Wage Theft Prevention\n\nWage theft is one of the most common issues facing brand ambassadors...",
        tags: ["Rights", "Wage Theft", "Guide"],
        published: true,
        publishedAt: new Date("2026-05-15"),
        featured: true,
        views: 2340,
      },
      {
        authorId: admin.id,
        title: "New Agency Verification Standards Effective July 2026",
        slug: "new-agency-verification-standards-july-2026",
        excerpt: "Updated verification requirements for staffing agencies operating on the UBA platform.",
        content: "# New Agency Verification Standards\n\nEffective July 1, 2026, all agencies must meet enhanced verification standards...",
        tags: ["Agencies", "Verification", "Policy"],
        published: true,
        publishedAt: new Date("2026-06-10"),
        views: 890,
      },
      {
        authorId: superAdmin.id,
        title: "Q2 2026 Platform Update: New Features & Improvements",
        slug: "q2-2026-platform-update",
        excerpt: "A look at the latest features and improvements rolled out in Q2 2026.",
        content: "# Q2 2026 Platform Update\n\nWe've been working hard to improve the UBA platform...",
        tags: ["Platform", "Update", "Features"],
        published: false,
        views: 0,
      },
    ],
  });

  // ============================================================
  // EMAIL LOGS
  // ============================================================
  console.log("Creating email logs...");

  await prisma.emailLog.createMany({
    data: [
      {
        userId: baUsers[0].id,
        templateId: "welcome",
        recipient: "james.wilson@email.com",
        subject: "Welcome to UBA - Protecting the People Who Build Brands",
        status: EmailStatus.DELIVERED,
        sentAt: new Date("2025-06-01"),
        deliveredAt: new Date("2025-06-01"),
        openedAt: new Date("2025-06-01"),
      },
      {
        userId: baUsers[0].id,
        templateId: "complaint_received",
        recipient: "james.wilson@email.com",
        subject: "Complaint Received - We're Here to Help",
        status: EmailStatus.DELIVERED,
        sentAt: new Date("2026-06-08"),
        deliveredAt: new Date("2026-06-08"),
        openedAt: new Date("2026-06-09"),
      },
      {
        userId: baUsers[0].id,
        templateId: "lawyer_assigned",
        recipient: "james.wilson@email.com",
        subject: "Attorney Assigned to Your Case",
        status: EmailStatus.DELIVERED,
        sentAt: new Date("2026-06-12"),
        deliveredAt: new Date("2026-06-12"),
      },
      {
        userId: agencyUsers[2].id,
        templateId: "complaint_received",
        recipient: "admin@quicktemp.com",
        subject: "A Complaint Has Been Filed Against Your Agency",
        status: EmailStatus.SENT,
        sentAt: new Date("2026-06-09"),
      },
      {
        userId: baUsers[1].id,
        templateId: "payment_success",
        recipient: "maria.garcia@email.com",
        subject: "Payment Confirmation - UBA Membership",
        status: EmailStatus.DELIVERED,
        sentAt: new Date("2025-01-15"),
        deliveredAt: new Date("2025-01-15"),
        openedAt: new Date("2025-01-15"),
      },
      {
        userId: baUsers[2].id,
        templateId: "payment_failed",
        recipient: "david.kim@email.com",
        subject: "Action Required: Payment Failed",
        status: EmailStatus.BOUNCED,
        sentAt: new Date("2026-06-01"),
        bouncedAt: new Date("2026-06-01"),
        failureReason: "Mailbox full",
      },
    ],
  });

  // ============================================================
  // AUDIT LOGS
  // ============================================================
  console.log("Creating audit logs...");

  await prisma.auditLog.createMany({
    data: [
      {
        userId: superAdmin.id,
        action: AuditAction.CREATE,
        resource: "users",
        resourceId: admin.id,
        newValues: { email: "admin@uba.com", role: "ADMIN" },
        ipAddress: "192.168.1.100",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
      {
        userId: admin.id,
        action: AuditAction.SUSPEND,
        resource: "users",
        resourceId: baUsers[3].id,
        oldValues: { status: "ACTIVE" },
        newValues: { status: "SUSPENDED", reason: "Multiple unresolved complaints" },
        ipAddress: "192.168.1.101",
      },
      {
        userId: admin.id,
        action: AuditAction.UPDATE,
        resource: "complaints",
        resourceId: complaint1.id,
        oldValues: { status: "OPEN" },
        newValues: { status: "INVESTIGATING", assignedAdminId: admin.id },
        ipAddress: "192.168.1.101",
      },
      {
        userId: lawyerUsers[0].id,
        action: AuditAction.CREATE,
        resource: "case_notes",
        oldValues: null,
        newValues: { caseId: legalCase1.id, content: "Initial review complete..." },
        ipAddress: "10.0.0.50",
      },
      {
        userId: admin.id,
        action: AuditAction.ROLE_CHANGE,
        resource: "users",
        resourceId: moderator.id,
        oldValues: { role: "BA" },
        newValues: { role: "MODERATOR" },
        ipAddress: "192.168.1.101",
      },
      {
        userId: superAdmin.id,
        action: AuditAction.SETTINGS_CHANGED,
        resource: "system",
        newValues: { setting: "max_file_size", value: "50MB" },
        ipAddress: "192.168.1.100",
      },
    ],
  });

  // ============================================================
  // EVENTS
  // ============================================================
  console.log("Creating events...");

  await prisma.event.createMany({
    data: [
      {
        userId: superAdmin.id,
        title: "UBA Annual Brand Ambassador Summit 2026",
        description: "Join us for our annual summit featuring workshops, networking, and keynote speakers.",
        eventType: "conference",
        startDate: new Date("2026-09-15"),
        endDate: new Date("2026-09-17"),
        location: "Las Vegas Convention Center",
        isPublic: true,
      },
      {
        userId: admin.id,
        title: "Know Your Rights Webinar",
        description: "Free webinar covering BA rights, wage protection, and how to file complaints.",
        eventType: "webinar",
        startDate: new Date("2026-07-05"),
        isPublic: true,
      },
      {
        userId: lawyerUsers[0].id,
        title: "Case Review Meeting - Wilson v. QuickTemp",
        description: "Internal case review meeting.",
        eventType: "meeting",
        startDate: new Date("2026-06-25"),
        isPublic: false,
      },
    ],
  });

  console.log("✅ Database seeded successfully!");
  console.log("\n📊 Seed Summary:");
  console.log(`   Roles: ${await prisma.role.count()}`);
  console.log(`   Users: ${await prisma.user.count()}`);
  console.log(`   BA Profiles: ${await prisma.baProfile.count()}`);
  console.log(`   Agency Profiles: ${await prisma.agencyProfile.count()}`);
  console.log(`   Lawyer Profiles: ${await prisma.lawyerProfile.count()}`);
  console.log(`   Memberships: ${await prisma.membership.count()}`);
  console.log(`   Subscriptions: ${await prisma.subscription.count()}`);
  console.log(`   Payments: ${await prisma.payment.count()}`);
  console.log(`   Jobs: ${await prisma.job.count()}`);
  console.log(`   Applications: ${await prisma.application.count()}`);
  console.log(`   Reviews: ${await prisma.agencyReview.count()}`);
  console.log(`   Complaints: ${await prisma.complaint.count()}`);
  console.log(`   Tickets: ${await prisma.ticket.count()}`);
  console.log(`   Legal Cases: ${await prisma.legalCase.count()}`);
  console.log(`   Case Notes: ${await prisma.caseNote.count()}`);
  console.log(`   Documents: ${await prisma.document.count()}`);
  console.log(`   Notifications: ${await prisma.notification.count()}`);
  console.log(`   News Posts: ${await prisma.newsPost.count()}`);
  console.log(`   Email Logs: ${await prisma.emailLog.count()}`);
  console.log(`   Audit Logs: ${await prisma.auditLog.count()}`);
  console.log(`   Events: ${await prisma.event.count()}`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
