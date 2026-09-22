const SUPABASE_URL = "https://teftyvcksalntiollvsi.supabase.co/rest/v1/";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_ikFaiYNQaYZFcioxSGs6Xg_bMrnFwLp";

window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

console.log("Supabase connected successfully!");