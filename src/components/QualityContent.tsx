
import { motion } from 'framer-motion';
import { Droplet, Star, ShieldCheck } from 'lucide-react';

export function QualityContent() {
  const qualityItems = [
    {
      icon: <Droplet className="h-6 w-6" />,
      title: 'Premium Products',
      description: 'We use high-quality, dermatologically tested detergents that are gentle on fabrics and skin.',
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: 'Expert Staff',
      description: 'Our team undergoes rigorous training in fabric care and stain removal techniques.',
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: 'Quality Guarantee',
      description: "If you're not completely satisfied, we'll rewash or reclean your items at no additional cost.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {qualityItems.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="glass-card rounded-xl p-6"
        >
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
            {item.icon}
          </div>
          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
          <p className="text-muted-foreground">{item.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
