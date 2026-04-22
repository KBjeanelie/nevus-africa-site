const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ ERREUR: SUPABASE_URL ou SUPABASE_ANON_KEY manquant dans les variables d environnement.');
}

const supabase = (!supabaseUrl || !supabaseKey) 
  ? null 
  : createClient(supabaseUrl, supabaseKey);

// Wrapper functions to provide a clean API for the database layer
const db = {
  async checkConfig() {
    if (!supabase) throw new Error('Configuration Supabase manquante');
  },

  // Obtenir les paramètres
  async getSettings() {
    await this.checkConfig();
    const { data, error } = await supabase.from('site_settings').select('key, value');
    if (error) throw error;
    const settingsObj = {};
    data.forEach(s => settingsObj[s.key] = s.value);
    return settingsObj;
  },

  // Mettre à jour un paramètre
  async updateSetting(key, value) {
    const { error } = await supabase
      .from('site_settings')
      .update({ value, updated_at: new Date() })
      .eq('key', key);
    if (error) throw error;
    return true;
  },

  // Obtenir les sections
  async getSections() {
    await this.checkConfig();
    const { data, error } = await supabase.from('sections').select('*').order('order_index');
    if (error) throw error;
    return data;
  },

  // Mettre à jour une section
  async updateSection(id, updates) {
    const { error } = await supabase
      .from('sections')
      .update({ ...updates, updated_at: new Date() })
      .eq('id', id);
    if (error) throw error;
    return true;
  },

  // Obtenir les contacts
  async getContacts() {
    await this.checkConfig();
    const { data, error } = await supabase.from('contact_info').select('type, value');
    if (error) throw error;
    const contactsObj = {};
    data.forEach(c => contactsObj[c.type] = c.value);
    return contactsObj;
  },

  // Mettre à jour un contact
  async updateContact(type, value) {
    const { error } = await supabase
      .from('contact_info')
      .update({ value, updated_at: new Date() })
      .eq('type', type);
    if (error) throw error;
    return true;
  },

  // Gérer les messages
  async saveMessage(msg) {
    const { error } = await supabase.from('messages').insert([msg]);
    if (error) throw error;
    return true;
  },

  async getMessages() {
    await this.checkConfig();
    const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async deleteMessage(id) {
    const { error } = await supabase.from('messages').delete().eq('id', id);
    if (error) throw error;
    return true;
  },

  // Authentification
  async getUser(username) {
    const { data, error } = await supabase.from('users').select('*').eq('username', username).single();
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "no rows found"
    return data;
  },

  // Réinitialisation
  async reset() {
    // Cette partie est plus complexe car Supabase n'aime pas les delete massifs sans filtre
    // On va faire des updates ou deletes ciblés si nécessaire
    // Mais pour une démo, on peut laisser l'utilisateur gérer ça via le dashboard Supabase
    return true;
  }
};

module.exports = db;
