"use client";

import { ActionButton } from "@/components/ActionButton";
import { CardType } from "@/database/models/Cards";
import { deleteCardAction } from "../actions/deleteCardAction";
import { Trash2Icon } from "lucide-react";
import UpdateCardForm from "./UpdateCardForm";

interface CardListProps {
  cards: CardType[];
}

export default function CardList({ cards }: CardListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card._id}
          className="group h-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
        >
          <div className="flex flex-col h-full justify-between gap-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Question
                </h3>
                <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {card.front}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Answer
                </h3>
                <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {card.back}
                </p>
              </div>
            </div>

            {/* [Viability State & Action Buttons] */}
            <div className="flex justify-between gap-2">
              <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                  card.visibility === "private"
                    ? "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                    : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                }`}
              >
                {card.visibility}
              </span>

              <div className="flex gap-2">
                {/* [Update Button] */}
                <UpdateCardForm
                  key={`${card.front}-${card.back}-${card.visibility}`}
                  cardId={String(card._id)}
                  defaultValues={{
                    front: card.front,
                    back: card.back,
                    visibility: card.visibility,
                  }}
                />

                {/* [Delete Button] */}
                <ActionButton
                  action={deleteCardAction.bind(null, String(card._id))}
                  requireAreYouSure={true}
                  className="p-2 text-gray-500 hover:text-red-500 transition-colors duration-200"
                >
                  <Trash2Icon className="h-5 w-5" />
                </ActionButton>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
