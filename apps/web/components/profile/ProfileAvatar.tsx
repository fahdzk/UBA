import { User } from "lucide-react";

interface ProfileAvatarProps {
  avatarUrl?: string;
  displayName: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function ProfileAvatar({ avatarUrl, displayName, size = "md" }: ProfileAvatarProps) {
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-12 w-12 text-sm",
    lg: "h-16 w-16 text-lg",
    xl: "h-28 w-28 text-3xl",
  };

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={displayName}
        className={`${sizeClasses[size]} rounded-full object-cover`}
      />
    );
  }

  return (
    <div className={`${sizeClasses[size]} flex items-center justify-center rounded-full bg-navy-100 text-navy-600`}>
      <span className={`font-heading font-bold ${size === "xl" ? "text-3xl" : ""}`}>
        {initials || <User className="h-1/2 w-1/2" />}
      </span>
    </div>
  );
}
