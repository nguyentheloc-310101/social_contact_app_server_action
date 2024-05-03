'use client';
import { Hash } from 'lucide-react';

import { MobileToggle } from '@/components/mobile-toggle';
import { SocketIndicator } from '@/components/socket-indicator';
import { UserAvatar } from '@/components/user-avatar';

import { Button } from '../ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import { ChatVideoButton } from './chat-video-button';
import { Member, MemberRole } from '@prisma/client';
import PlanDescription from '../plan/plan-description';

interface ChatHeaderProps {
  serverId: string;
  currentMember?: Member;
  name: string;
  type: 'channel' | 'conversation';
  imageUrl?: string;
}

export const ChatHeader = ({
  name,
  type,
  imageUrl,
  serverId,
  currentMember,
}: ChatHeaderProps) => {
  let isAdmin = false;
  if (currentMember) {
    isAdmin = currentMember.role === MemberRole.ADMIN;
  }

  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <MobileToggle serverId={serverId} />
      {type === 'channel' && (
        <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
      )}
      {type === 'conversation' && (
        <UserAvatar
          src={imageUrl}
          className="h-8 w-8 md:h-8 md:w-8 mr-2"
        />
      )}
      <p className="font-semibold text-md text-black dark:text-white">{name}</p>

      <div className="ml-auto flex items-center">
        {type === 'conversation' && (
          <Drawer>
            <DrawerTrigger>
              <div className="mx-[12px] text-[green] cursor-pointer hover:text-[#46a246]">
                Plan detail
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Here is your plan</DrawerTitle>
                {isAdmin && <div>admin moi thay cai nay </div>}
                <DrawerDescription>
                  This plan is auto generated by meGoZ AI. Please let us know
                  (DM) if you want to adjust the plan!
                </DrawerDescription>
              </DrawerHeader>
              <div className="max-h-[500px] overflow-y-scroll p-4">
                <PlanDescription />
              </div>
              <DrawerFooter>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}
        {type === 'conversation' && <ChatVideoButton />}
        <SocketIndicator />
      </div>
    </div>
  );
};
