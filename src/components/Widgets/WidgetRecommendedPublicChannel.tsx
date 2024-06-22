import React from "react";
import Widget from "./Widget";
import { User } from "@/domain/entities/User";
import { UserProfile } from "@/domain/entities/UserProfile";

type Channel = {
  id: number;
  name: string;
  knownUsers: User[];
  recommendReason?: string;
  channeldId: string;
};

const WidgetRecommendedPublicChannel: React.FC = () => {
  const channels: Channel[] = [
    {
      id: 1,
      name: "Anything Question Board@Nostr",
      knownUsers: [
        new User({
          npub: "npubhogefuga",
          pubkey: "pubhogefuga",
          profile: new UserProfile({
            name: "julia",
            image: "https://randomuser.me/api/portraits/women/1.jpg",
          }),
        }),
        new User({
          npub: "npubhogefuga2",
          pubkey: "pubhogefuga2",
          profile: new UserProfile({
            name: "kaori",
            image: "https://randomuser.me/api/portraits/women/2.jpg",
          }),
        }),
        new User({
          npub: "npubhogefuga3",
          pubkey: "pubhogefuga3",
          profile: new UserProfile({
            name: "nostaro",
            image: "https://randomuser.me/api/portraits/men/1.jpg",
          }),
        }),
      ],
      channeldId: "https://channel1.example.com",
    },
    {
      id: 2,
      name: "Favorite Vocaloid Introduction Thread",
      knownUsers: [
        new User({
          npub: "npubhogefuga",
          pubkey: "pubhogefuga",
          profile: new UserProfile({
            name: "julia",
            image: "https://randomuser.me/api/portraits/women/3.jpg",
          }),
        }),
        new User({
          npub: "npubhogefuga2",
          pubkey: "pubhogefuga2",
          profile: new UserProfile({
            name: "kaori",
            image: "https://randomuser.me/api/portraits/women/4.jpg",
          }),
        }),
      ],
      channeldId: "https://channel2.example.com",
    },
    {
      id: 3,
      name: "Bitcoin 101",
      knownUsers: [],
      recommendReason: "Many famous users participate",
      channeldId: "https://channel3.example.com",
    },
  ];

  return (
    <Widget topic="Recommended Public Channels">
      {channels.map((channel) => (
        <div
          key={channel.id}
          className="flex items-center justify-between py-2 border-b dark:border-gray-600"
        >
          <div className="flex items-center space-x-4">
            <div>
              <div className="font-medium text-gray-700 dark:text-gray-300">
                {channel.name}
              </div>
              {channel.knownUsers.length > 0 && (
                <div className="flex items-center space-x-2">
                  <div className="flex mt-1 -space-x-2">
                    {channel.knownUsers.map((user, index) => (
                      <div
                        className="relative group w-[32px]"
                        key={index}
                        style={{ zIndex: channel.knownUsers.length - index }}
                      >
                        <img
                          src={user.profile?.image}
                          alt={user.profile?.name}
                          className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 justify-center max-w-[150px] break-words">
                    <p className="truncate whitespace-pre-wrap line-clamp-2">
                      {channel.knownUsers.map((user, index) => {
                        if (index === 0) {
                          return `${user.profile?.name} participates`;
                        }
                        return `, ${user.profile?.name} participates`;
                      })}
                    </p>
                  </div>
                </div>
              )}
              {channel.knownUsers.length === 0 &&
                channel.recommendReason && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {channel.recommendReason}
                  </div>
                )}
            </div>
          </div>
          <button className="px-2 py-1 text-sm text-black transition bg-white rounded-full font-noto-sans min-w-16 hover:bg-gray-50">
            Join
          </button>
        </div>
      ))}
      <div className="mt-4 text-blue-500 cursor-pointer dark:text-blue-300 hover:underline">
        Show more
      </div>
    </Widget>
  );
};

export default WidgetRecommendedPublicChannel;

