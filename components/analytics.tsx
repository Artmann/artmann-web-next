"use client";

import { useEffect } from "react";
import { analytics } from "tinyplg-browser";

export function Analytics() {
  useEffect(() => {
    analytics.init("eyJhbGciOiJIUzI1NiJ9.eyJwcm9qZWN0SWQiOiI3OWUzZTQ4OC1kZWQyLTRiYzAtOGQ3MS04ODlhOTE2MWYyNGYiLCJpYXQiOjE3NTA0MjY0NjUsImV4cCI6MTc4MTk4NDA2NX0.FtFbJA-ISNmDMhAeBjnOxDYWu0qeOwnsM0tpB3LBqug");
  }, []);

  return null;
}