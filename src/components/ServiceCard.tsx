
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  price: string;
  link: string;
  index: number;
}

export function ServiceCard({ title, description, icon, price, link, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card rounded-xl p-6 flex flex-col h-full hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
        <div className="chip bg-secondary text-foreground">{price}</div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm mb-4 flex-grow">{description}</p>
      <Button asChild variant="ghost" className="justify-start p-0 hover:bg-transparent">
        <Link to={link} className="flex items-center text-primary font-medium">
          Learn more <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </motion.div>
  );
}
