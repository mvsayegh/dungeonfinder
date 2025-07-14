
import { useState, useMemo } from 'react';

export interface TableFilters {
  search: string;
  system: string;
  location: string;
  mode: string;
  schedule: string;
  minRating: number[];
  maxPlayers: string;
  onlyVip: boolean;
  tags: string[];
}

export const useTableFilters = () => {
  const [filters, setFilters] = useState<TableFilters>({
    search: "",
    system: "all",
    location: "",
    mode: "all",
    schedule: "",
    minRating: [4],
    maxPlayers: "",
    onlyVip: false,
    tags: []
  });

  const clearFilters = () => {
    setFilters({
      search: "",
      system: "all",
      location: "",
      mode: "all",
      schedule: "",
      minRating: [4],
      maxPlayers: "",
      onlyVip: false,
      tags: []
    });
  };

  const toggleTag = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const updateFilter = (key: keyof TableFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const hasActiveFilters = useMemo(() => {
    return filters.search !== "" ||
           filters.system !== "all" ||
           filters.location !== "" ||
           filters.mode !== "all" ||
           filters.schedule !== "" ||
           filters.minRating[0] !== 4 ||
           filters.maxPlayers !== "" ||
           filters.onlyVip ||
           filters.tags.length > 0;
  }, [filters]);

  return {
    filters,
    setFilters,
    clearFilters,
    toggleTag,
    updateFilter,
    hasActiveFilters
  };
};
