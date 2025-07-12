import ProductReview from "@/database/models/product-reviews.model";
import UserAddress from "@/database/models/user-addresses.model";
import { fetchOneUser } from "@/repositories/users.repository";

export const fetchUserProfile = async (userId: number) => {
  const userData = await fetchOneUser({
    where: { id: userId },
    attributes: ["id", "first_name", "last_name", "email", "contact_no"],
    include: [
      {
        model: UserAddress,
        attributes: [
          "id",
          "address_line_1",
          "address_line_2",
          "landmark",
          "pincode",
          "address_type",
          "is_primary",
          "longitude",
          "latitude",
        ],
      },
      {
        model: ProductReview,
        attributes: ["id", "user_id", "product_id", "rating", "review"],
      },
    ],
  });

  return userData;
};
