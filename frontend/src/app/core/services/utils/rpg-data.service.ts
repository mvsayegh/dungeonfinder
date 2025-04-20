// src/app/shared/services/rpg-data.service.ts

import { Injectable } from '@angular/core';
import { RPG_STATUS_LABELS, RPG_STATUSES, RPG_SYSTEM_LABELS, RPG_SYSTEMS, RPGStatus, RPGSystem } from '../../models/rpg.model';

@Injectable({
  providedIn: 'root',
})
export class RPGDataService {
  private formatLabel(value: string): string {
    return value
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, char => char.toUpperCase());
  }

  getRPGSystems(): { label: string; value: RPGSystem }[] {
    return RPG_SYSTEMS.map(system => ({
      label: RPG_SYSTEM_LABELS[system],
      value: system,
    }));
  }

  getRPGStatuses(): { label: string; value: RPGStatus }[] {
    return RPG_STATUSES.map(status => ({
      label: RPG_STATUS_LABELS[status],
      value: status,
    }));
  }
}
