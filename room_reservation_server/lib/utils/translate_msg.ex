defmodule RoomReservationServerWeb.TranslateMsg do
  require RoomReservationServerWeb.Gettext

  def translate_msg(s) do
    Gettext.gettext(RoomReservationServerWeb.Gettext, s)
  end

  def sigil_t(string, []), do: Gettext.gettext(RoomReservationServerWeb.Gettext, string)
end