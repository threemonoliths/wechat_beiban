defmodule RoomReservationServer.AuthFailureController do
  use RoomReservationServerWeb, :controller
  import RoomReservationServerWeb.TranslateMsg

  def plug_auth_failure(conn, %{"msg" => msg}) do
    json conn , %{error: ~t/#{msg}/}
  end
end