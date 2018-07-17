defmodule RoomReservationServerWeb.DictController do
  use RoomReservationServerWeb, :controller

  use RoomReservationServer.DictContext
  alias RoomReservationServer.DictContext
  alias RoomReservationServer.DictContext.Dict

  action_fallback RoomReservationServerWeb.FallbackController

  def index(conn, params) do
    page = page(params)
    render(conn, "index.json", page: page)
  end

  def create(conn, %{"dict" => dict_params}) do
    dict_changeset = Dict.changeset(%Dict{}, dict_params)
    with {:ok, %Dict{} = dict} <- save_create(dict_changeset) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", dict_path(conn, :show, dict))
      |> render("show.json", dict: dict)
    end
  end

  def show(conn, %{"id" => id}) do
    with {:ok, dict} <- get_by_id(Dict, id) do
      render(conn, "show.json", dict: dict)
    end
  end

  def update(conn, %{"id" => id, "dict" => dict_params}) do
    with {:ok, dict} <- get_by_id(Dict, id) do
      dict_changeset = Dict.changeset(dict, dict_params)
      with {:ok, %Dict{} = dict} <- save_update(dict_changeset) do
        render(conn, "show.json", dict: dict)
      end
    end
  end

  def delete(conn, %{"id" => id}) do
    with {:ok, %Dict{} = dict} <- delete_by_id(Dict, id) do
      render(conn, "show.json", dict: dict)
    end
  end
end
