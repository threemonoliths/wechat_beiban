defmodule RoomReservationServer.RoomOrderInfoContext.RoomOrderInfo do
  use Ecto.Schema
  import Ecto.Changeset
  alias RoomReservationServer.RoomContext.Room

  schema "room_order_info" do
    field :user_id, :string
    field :start_time, :date
    field :end_time, :date
    field :comment, :string
    field :status, :boolean, default: true
    belongs_to :room, Room, on_replace: :nilify
    
    timestamps()
  end

  @doc false
  def changeset(room_order_info, attrs) do
    room_order_info
    |> cast(attrs, [:user_id, :start_time, :end_time, :status])
    |> validate_required([:user_id, :start_time, :end_time, :status])
  end
end
