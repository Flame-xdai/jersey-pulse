import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const WhatsAppFloat = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hi JerseyStore, I need help with ordering authentic jerseys. Can you assist me?"
    );
    window.open(`https://wa.me/8801952081184?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-24 right-4 z-50 md:bottom-6 md:right-6">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleWhatsAppClick}
        className="bg-[#25D366] hover:bg-[#128C7E] text-white p-3 rounded-full shadow-2xl flex items-center justify-center w-14 h-14 transition-colors duration-200"
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp className="w-8 h-8" />
      </motion.button>
    </div>
  );
};

export default WhatsAppFloat;