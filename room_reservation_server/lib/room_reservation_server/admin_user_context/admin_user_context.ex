defmodule RoomReservationServer.AdminUserContext do
  @moduledoc """
  The AdminUserContext context.
  """

  import Ecto.Query, warn: false
  alias RoomReservationServer.Repo

  alias RoomReservationServer.AdminUserContext.AdminUser
  use RoomReservationServer.BaseContext

  defmacro __using__(_opts) do
    quote do
      import RoomReservationServer.AdminUserContext
      use RoomReservationServer.BaseContext
      alias RoomReservationServer.AdminUserContext.AdminUser
    end
  end

  def page(params, conn) do 
    User
    |> query_like(params, "name")
    |> query_order_desc_by(params, "inserted_at")
    |> get_pagination(params)
  end

end
