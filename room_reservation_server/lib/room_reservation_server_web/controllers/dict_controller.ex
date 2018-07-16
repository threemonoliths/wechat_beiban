defmodule RoomReservationServerWeb.DictController do
  use RoomReservationServerWeb, :controller

  alias RoomReservationServer.DictContext
  alias RoomReservationServer.DictContext.Dict

  action_fallback RoomReservationServerWeb.FallbackController

  def index(conn, _params) do
    dicts = DictContext.list_dicts()
    render(conn, "index.json", dicts: dicts)
  end

  def create(conn, %{"dict" => dict_params}) do
    with {:ok, %Dict{} = dict} <- DictContext.create_dict(dict_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", dict_path(conn, :show, dict))
      |> render("show.json", dict: dict)
    end
  end

  def show(conn, %{"id" => id}) do
    dict = DictContext.get_dict!(id)
    render(conn, "show.json", dict: dict)
  end

  def update(conn, %{"id" => id, "dict" => dict_params}) do
    dict = DictContext.get_dict!(id)

    with {:ok, %Dict{} = dict} <- DictContext.update_dict(dict, dict_params) do
      render(conn, "show.json", dict: dict)
    end
  end

  def delete(conn, %{"id" => id}) do
    dict = DictContext.get_dict!(id)
    with {:ok, %Dict{}} <- DictContext.delete_dict(dict) do
      send_resp(conn, :no_content, "")
    end
  end
end
