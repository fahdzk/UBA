
import { Star, MessageSquare } from "lucide-react";

const MOCK_REVIEWS = [
  { id: "1", author: "John Smith", rating: 5, comment: "Great agency! Professional and responsive.", date: "2026-06-10" },
  { id: "2", author: "Jane Doe", rating: 4, comment: "Good experience overall. Clear communication.", date: "2026-06-05" },
  { id: "3", author: "Mike Johnson", rating: 5, comment: "Excellent opportunities and support.", date: "2026-05-28" },
];

export default function AgencyReviewsPage() {
  const avgRating = MOCK_REVIEWS.reduce((sum, r) => sum + r.rating, 0) / MOCK_REVIEWS.length;
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
      <p className="text-gray-500 mt-1">See what BAs say about your agency</p>
      <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border flex items-center gap-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-[#032B66]">{avgRating.toFixed(1)}</div>
          <div className="flex gap-0.5 mt-1 justify-center">
            {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={16} className={s <= Math.round(avgRating) ? "text-amber-400 fill-amber-400" : "text-gray-200"} />)}
          </div>
          <p className="text-sm text-gray-500 mt-1">{MOCK_REVIEWS.length} reviews</p>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        {MOCK_REVIEWS.map((review) => (
          <div key={review.id} className="bg-white rounded-xl p-5 shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#032B66] rounded-full flex items-center justify-center text-white text-sm font-bold">{review.author[0]}</div>
                <span className="font-medium text-gray-900">{review.author}</span>
              </div>
              <span className="text-sm text-gray-400">{review.date}</span>
            </div>
            <div className="flex gap-0.5 mb-2">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={14} className={s <= review.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"} />)}
            </div>
            <p className="text-sm text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
