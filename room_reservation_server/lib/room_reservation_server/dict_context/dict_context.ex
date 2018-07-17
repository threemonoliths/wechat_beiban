defmodule RoomReservationServer.DictContext do
  @moduledoc """
  The DictContext context.
  """

  import Ecto.Query, warn: false
  alias RoomReservationServer.Repo

  alias RoomReservationServer.DictContext.Dict
  use RoomReservationServer.BaseContext

  defmacro __using__(_opts) do
    quote do
      import RoomReservationServer.DictContext
      use RoomReservationServer.BaseContext
      alias RoomReservationServer.DictContext.Dict
    end
  end

  def page(params) do 
    Dict
    |> query_like(params, "type")
    |> query_like(params, "key")
    |> get_pagination(params)
  end
end
