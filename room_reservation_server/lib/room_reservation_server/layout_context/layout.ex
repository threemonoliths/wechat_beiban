defmodule RoomReservationServer.LayoutContext.Layout do
  use Ecto.Schema
  use Arc.Ecto.Schema
  import Ecto.Changeset
  alias RoomReservationServer.RoomContext.Room


  schema "layouts" do
    field :layout, :string
    field :layout_pic, RoomReservationServer.LayoutPic.Type
    field :price_01, :decimal
    field :price_02, :decimal
    field :book_price, :decimal
    field :breakfast, :boolean
    field :desc, :string
    has_many :rooms, Room, on_replace: :nilify
    timestamps()
  end

  @doc false
  def changeset(layout, attrs) do
    layout
    |> cast(attrs, [:layout, :price_01, :price_02, :book_price, :breakfast, :desc])
    |> cast_attachments(attrs, [:layout_pic])
    |> validate_required([:layout, :price_01, :book_price, :breakfast])
  end
end
