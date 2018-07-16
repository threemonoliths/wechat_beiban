defmodule RoomReservationServer.RoomContext.Room do
  use Ecto.Schema
  import Ecto.Changeset
  alias RoomReservationServer.RoomOrderInfoContext.RoomOrderInfo


  schema "rooms" do
    field :room_number, :string
    field :desc, :string
    belongs_to :layout, RoomReservationServer.LayoutContext.Layout, on_replace: :nilify
    has_many :order_info, RoomOrderInfo, on_replace: :nilify

    timestamps()
  end

  @doc false
  def changeset(room, attrs) do
    room
    |> cast(attrs, [:layout_id, :room_number, :desc])
    |> validate_required([:layout_id, :room_number])
  end
end
