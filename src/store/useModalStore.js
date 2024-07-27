import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", {
  state: () => ({
    deleteModal: false,
    modalId: null,
    modalTitle: "",
  }),
});
