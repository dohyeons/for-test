import ListItem from "@/components/ListItem";
import { Review } from "@/app/(common)/gathering/types";
import DashedLine from "@/components/DashedLine";
import Score from "@/components/Score";

export default function ReviewList({ reviewList }: { reviewList: Review[] }) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4">
        {reviewList.map((item) => (
          <div key={item.id}>
            <ListItem>
              <div className="mb-2 flex flex-col gap-3">
                <Score score={item.score} />
                <ListItem.Body>{item.comment}</ListItem.Body>
              </div>
              <ListItem.MetaInfo primary={item.user.name} secondary={item.createdAt} />
            </ListItem>
            <DashedLine className="mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
