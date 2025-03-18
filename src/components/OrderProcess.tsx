
import { motion } from 'framer-motion';

interface ProcessStep {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface OrderProcessProps {
  steps: ProcessStep[];
}

export function OrderProcess({ steps }: OrderProcessProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {steps.map((step, index) => (
        <motion.div
          key={step.number}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative"
        >
          {/* Connecting line */}
          {index < steps.length - 1 && (
            <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-border z-0 -translate-y-1/2" />
          )}
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-4 flex items-center justify-center h-20 w-20 rounded-full bg-secondary text-primary border border-border">
              <div className="text-3xl font-bold">{step.number}</div>
            </div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-muted-foreground text-sm">{step.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
