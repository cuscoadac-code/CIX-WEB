import { createClient } from '@supabase/supabase-js';

// Reemplaza estas variables con los valores de tu panel de Supabase
// (Project Settings > API)
const supabaseUrl = 'https://ewlzoxnepudlxhywqzjv.supabase.co';
const supabaseKey = 'sb_publishable_Y7uAOdrakHuSiSsllusa7g__Sy16R-F';

export const supabase = createClient(supabaseUrl, supabaseKey);
