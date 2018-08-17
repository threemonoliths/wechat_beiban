defmodule RoomReservationServer.CarContext.Car do
  use Ecto.Schema
  import Ecto.Changeset


  schema "cars" do
    field :buydate, :date
    field :kind, :string
    field :no, :string
    field :orderdate, :date
    field :pic, :string
    field :price, :decimal
    field :state, :string
    field :usedate, :date

    timestamps()
  end

  @doc false
  def changeset(car, attrs) do
    car
    |> cast(attrs, [:no, :kind, :pic, :price, :buydate, :orderdate, :usedate, :state])
    |> validate_required([:no])
  end
end
