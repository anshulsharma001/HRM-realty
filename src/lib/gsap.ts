"use client";

/**
 * Single GSAP registration point (§4.2). Import from here, never from "gsap"
 * directly, so plugins are registered exactly once.
 */
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { Flip } from "gsap/Flip";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin, Flip, CustomEase);

export { gsap, useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin, Flip, CustomEase };
