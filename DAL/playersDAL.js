import { supabase } from '../db/connectSupaBase.js';




// קבל את כל השחקנים
export async function getAllPlayers() {
  const { data, error } = await supabase.from('players').select('*');
  if (error) throw error;
  return data;
}



// קבל שחקן לפי id
export async function getPlayerById(id) {
  const { data, error } = await supabase.from('players').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}


// קבל שחקן לפי name
export async function getPlayerByname(name) {
  const { data, error } = await supabase.from('players').select('*').ilike('username', name).single();
  if (error) return null;
  return data;
}




// הוסף שחקן חדש
export async function addPlayer(player) {
  const { data, error } = await supabase.from('players').insert([player]).select().single();
  if (error) throw error; 
  return data;
}




// עדכן זמן שחקן
export async function updatePlayerTime(id, time) {

  const player = await getPlayerById(id);
  if (!player) throw new Error("Player not found");

  if (player.best_time === null || time < player.best_time) {
    const { data, error } = await supabase
      .from('players')
      .update({ best_time: time })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return { msg: "New record!", player: data };
  } else {
    return { msg: "No improvement", player };
  }
}



// מחק שחקן
export async function deletePlayer(id) {
  const { data, error } = await supabase.from('players').delete().eq('id', id);
  if (error) throw error;
  return data;
}
