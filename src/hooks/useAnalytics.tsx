import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useAnalytics = (userId: string | undefined) => {
  const trackView = useCallback(async () => {
    if (!userId) return;

    try {
      await supabase.from("analytics").insert({
        user_id: userId,
        event_type: "view",
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
      });
    } catch (error) {
      console.error("Error tracking view:", error);
    }
  }, [userId]);

  const trackClick = useCallback(async (linkId: string | null, linkLabel: string) => {
    if (!userId) return;

    try {
      await supabase.from("analytics").insert({
        user_id: userId,
        event_type: "click",
        link_id: linkId,
        link_label: linkLabel,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
      });
    } catch (error) {
      console.error("Error tracking click:", error);
    }
  }, [userId]);

  return { trackView, trackClick };
};
