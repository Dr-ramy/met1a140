// components/modals/VideoModalButton.tsx

'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IconType } from 'react-icons';

interface VideoModalButtonProps {
  iframeUrl: string;
  buttonText: string;
  icon?: IconType;
  title?: string; // عنوان يمكن تمريره للـ Modal
}

const VideoModalButton: React.FC<VideoModalButtonProps> = ({ iframeUrl, buttonText, icon: Icon, title }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full flex items-center justify-center gap-2">
          {Icon && <Icon />}
          {buttonText}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl w-[90vw]">
        {/* ✅ عنوان مطلوب لتحسين إمكانية الوصول */}
        <DialogTitle className="sr-only">{title || 'شاهد'}</DialogTitle>

        <iframe
          width="100%"
          height="400px"
          src={iframeUrl}
          title={title || 'Embedded Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </DialogContent>
    </Dialog>
  );
};

export default VideoModalButton;
