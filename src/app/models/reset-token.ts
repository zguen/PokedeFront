import { Master } from "./master";

export interface ResetToken {
  resetToken?: string;
  error?: string;
  master?: Master; // Ajout de la propriété master pour représenter les informations du master
}
