import { GameUpdateViewData } from "../game/GameUpdates";
import { ClientID, GameConfig, GameID, Turn } from "../Schemas";
import {
  PlayerActions,
  PlayerID,
  PlayerProfile,
  PlayerBorderTiles,
} from "../game/Game";

export type WorkerMessageType =
  | "heartbeat"
  | "init"
  | "initialized"
  | "turn"
  | "game_update"
  | "player_actions"
  | "player_actions_result"
  | "player_profile"
  | "player_profile_result"
  | "player_border_tiles"
  | "player_border_tiles_result";

// Base interface for all messages
interface BaseWorkerMessage {
  type: WorkerMessageType;
  id?: string;
}

export interface HeartbeatMessage extends BaseWorkerMessage {
  type: "heartbeat";
}

// Messages from main thread to worker
export interface InitMessage extends BaseWorkerMessage {
  type: "init";
  gameID: GameID;
  gameConfig: GameConfig;
  clientID: ClientID;
}

export interface TurnMessage extends BaseWorkerMessage {
  type: "turn";
  turn: Turn;
}

// Messages from worker to main thread
export interface InitializedMessage extends BaseWorkerMessage {
  type: "initialized";
}

export interface GameUpdateMessage extends BaseWorkerMessage {
  type: "game_update";
  gameUpdate: GameUpdateViewData;
}

export interface PlayerActionsMessage extends BaseWorkerMessage {
  type: "player_actions";
  playerID: PlayerID;
  x: number;
  y: number;
}

export interface PlayerActionsResultMessage extends BaseWorkerMessage {
  type: "player_actions_result";
  result: PlayerActions;
}

export interface PlayerProfileMessage extends BaseWorkerMessage {
  type: "player_profile";
  playerID: number;
}

export interface PlayerProfileResultMessage extends BaseWorkerMessage {
  type: "player_profile_result";
  result: PlayerProfile;
}

export interface PlayerBorderTilesMessage extends BaseWorkerMessage {
  type: "player_border_tiles";
  playerID: PlayerID;
}

export interface PlayerBorderTilesResultMessage extends BaseWorkerMessage {
  type: "player_border_tiles_result";
  result: PlayerBorderTiles;
}

// Union types for type safety
export type MainThreadMessage =
  | HeartbeatMessage
  | InitMessage
  | TurnMessage
  | PlayerActionsMessage
  | PlayerProfileMessage
  | PlayerBorderTilesMessage;

// Message send from worker
export type WorkerMessage =
  | InitializedMessage
  | GameUpdateMessage
  | PlayerActionsResultMessage
  | PlayerProfileResultMessage
  | PlayerBorderTilesResultMessage;
