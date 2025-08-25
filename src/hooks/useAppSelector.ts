import { useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState } from "@src/store/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
