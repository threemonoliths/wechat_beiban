defmodule RoomReservationServer.RoomOrderInfoContext do
  @moduledoc """
  The RoomOrderInfoContext context.
  """

  import Ecto.Query, warn: false
  alias RoomReservationServer.Repo

  alias RoomReservationServer.RoomOrderInfoContext.RoomOrderInfo

  @doc """
  Returns the list of room_order_info.

  ## Examples

      iex> list_room_order_info()
      [%RoomOrderInfo{}, ...]

  """
  def list_room_order_info do
    Repo.all(RoomOrderInfo)
  end

  @doc """
  Gets a single room_order_info.

  Raises `Ecto.NoResultsError` if the Room order info does not exist.

  ## Examples

      iex> get_room_order_info!(123)
      %RoomOrderInfo{}

      iex> get_room_order_info!(456)
      ** (Ecto.NoResultsError)

  """
  def get_room_order_info!(id), do: Repo.get!(RoomOrderInfo, id)

  @doc """
  Creates a room_order_info.

  ## Examples

      iex> create_room_order_info(%{field: value})
      {:ok, %RoomOrderInfo{}}

      iex> create_room_order_info(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_room_order_info(attrs \\ %{}) do
    %RoomOrderInfo{}
    |> RoomOrderInfo.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a room_order_info.

  ## Examples

      iex> update_room_order_info(room_order_info, %{field: new_value})
      {:ok, %RoomOrderInfo{}}

      iex> update_room_order_info(room_order_info, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_room_order_info(%RoomOrderInfo{} = room_order_info, attrs) do
    room_order_info
    |> RoomOrderInfo.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a RoomOrderInfo.

  ## Examples

      iex> delete_room_order_info(room_order_info)
      {:ok, %RoomOrderInfo{}}

      iex> delete_room_order_info(room_order_info)
      {:error, %Ecto.Changeset{}}

  """
  def delete_room_order_info(%RoomOrderInfo{} = room_order_info) do
    Repo.delete(room_order_info)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking room_order_info changes.

  ## Examples

      iex> change_room_order_info(room_order_info)
      %Ecto.Changeset{source: %RoomOrderInfo{}}

  """
  def change_room_order_info(%RoomOrderInfo{} = room_order_info) do
    RoomOrderInfo.changeset(room_order_info, %{})
  end
end
