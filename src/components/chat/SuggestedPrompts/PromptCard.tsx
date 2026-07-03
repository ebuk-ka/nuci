import Card from "@/components/ui/Card";

interface PromptCardProps {
  title: string;
}

const PromptCard = ({ title }: PromptCardProps) => {
  return (
    <Card
      hover
      className="cursor-pointer p-5"
    >
      <p className="font-medium">
        {title}
      </p>
    </Card>
  );
};

export default PromptCard;