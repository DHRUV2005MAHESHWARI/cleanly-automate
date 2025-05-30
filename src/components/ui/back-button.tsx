
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  to?: string;
  label?: string;
  onClick?: () => void;
}

export function BackButton({ to, label = "Back", onClick }: BackButtonProps) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };
  
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className="flex items-center gap-1 mb-4" 
      onClick={handleClick}
    >
      <ChevronLeft className="h-4 w-4" />
      {label}
    </Button>
  );
}
