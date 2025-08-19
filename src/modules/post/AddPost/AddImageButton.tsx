import { Button } from "@/components/ui/button";

export const AddImageButton = ({ loadAction }: { loadAction: () => void }) => {
  return (
    <section className="flex items-center justify-center flex-col gap-2 mb-4 ">
      <p className="text-sm text-gray-500 mb-2 text-center px-4">
        Click the button below to add an image to your post.
      </p>
      <Button variant="outline" className="w-full h-10" onClick={loadAction}>
        Add Image
      </Button>
    </section>
  );
};
