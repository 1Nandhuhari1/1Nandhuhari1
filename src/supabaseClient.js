import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hijjcjyiuziwucwzudau.supabase.co';
const supabaseKey = 'sb_publishable_Rhq0btLSNUK-ieq3ArJAMg_IrUikBXW';

export const supabase = createClient(supabaseUrl, supabaseKey);
