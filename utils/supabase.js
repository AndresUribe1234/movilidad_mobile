import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://uishotzieycumbcfkmvl.supabase.co";
const supabasePublicKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpc2hvdHppZXljdW1iY2ZrbXZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAwNzAxNzUsImV4cCI6MjAwNTY0NjE3NX0.9q8jvAUqDLAgUkEU3rk00h8Joxnz3SN6g2USV13jrho";

export const supabase = createClient(supabaseUrl, supabasePublicKey);
