defmodule RoomReservationServer.DictContextTest do
  use RoomReservationServer.DataCase

  alias RoomReservationServer.DictContext

  describe "dicts" do
    alias RoomReservationServer.DictContext.Dict

    @valid_attrs %{type: "some type"}
    @update_attrs %{type: "some updated type"}
    @invalid_attrs %{type: nil}

    def dict_fixture(attrs \\ %{}) do
      {:ok, dict} =
        attrs
        |> Enum.into(@valid_attrs)
        |> DictContext.create_dict()

      dict
    end

    test "list_dicts/0 returns all dicts" do
      dict = dict_fixture()
      assert DictContext.list_dicts() == [dict]
    end

    test "get_dict!/1 returns the dict with given id" do
      dict = dict_fixture()
      assert DictContext.get_dict!(dict.id) == dict
    end

    test "create_dict/1 with valid data creates a dict" do
      assert {:ok, %Dict{} = dict} = DictContext.create_dict(@valid_attrs)
      assert dict.type == "some type"
    end

    test "create_dict/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = DictContext.create_dict(@invalid_attrs)
    end

    test "update_dict/2 with valid data updates the dict" do
      dict = dict_fixture()
      assert {:ok, dict} = DictContext.update_dict(dict, @update_attrs)
      assert %Dict{} = dict
      assert dict.type == "some updated type"
    end

    test "update_dict/2 with invalid data returns error changeset" do
      dict = dict_fixture()
      assert {:error, %Ecto.Changeset{}} = DictContext.update_dict(dict, @invalid_attrs)
      assert dict == DictContext.get_dict!(dict.id)
    end

    test "delete_dict/1 deletes the dict" do
      dict = dict_fixture()
      assert {:ok, %Dict{}} = DictContext.delete_dict(dict)
      assert_raise Ecto.NoResultsError, fn -> DictContext.get_dict!(dict.id) end
    end

    test "change_dict/1 returns a dict changeset" do
      dict = dict_fixture()
      assert %Ecto.Changeset{} = DictContext.change_dict(dict)
    end
  end
end
