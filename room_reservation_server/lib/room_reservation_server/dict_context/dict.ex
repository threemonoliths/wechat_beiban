defmodule RoomReservationServer.DictContext.Dict do
  use Ecto.Schema
  import Ecto.Changeset


  schema "dicts" do
    field :type, :string
    field :key, :string
    field :value, :string

    timestamps()
  end

  @doc false
  def changeset(dict, attrs) do
    dict
    |> cast(attrs, [:type, :key, :value])
    |> validate_required([:type, :key, :value])
  end
end
