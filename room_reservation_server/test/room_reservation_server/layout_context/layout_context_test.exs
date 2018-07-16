defmodule RoomReservationServer.LayoutContextTest do
  use RoomReservationServer.DataCase

  alias RoomReservationServer.LayoutContext

  describe "layouts" do
    alias RoomReservationServer.LayoutContext.Layout

    @valid_attrs %{layout: "some layout"}
    @update_attrs %{layout: "some updated layout"}
    @invalid_attrs %{layout: nil}

    def layout_fixture(attrs \\ %{}) do
      {:ok, layout} =
        attrs
        |> Enum.into(@valid_attrs)
        |> LayoutContext.create_layout()

      layout
    end

    test "list_layouts/0 returns all layouts" do
      layout = layout_fixture()
      assert LayoutContext.list_layouts() == [layout]
    end

    test "get_layout!/1 returns the layout with given id" do
      layout = layout_fixture()
      assert LayoutContext.get_layout!(layout.id) == layout
    end

    test "create_layout/1 with valid data creates a layout" do
      assert {:ok, %Layout{} = layout} = LayoutContext.create_layout(@valid_attrs)
      assert layout.layout == "some layout"
    end

    test "create_layout/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = LayoutContext.create_layout(@invalid_attrs)
    end

    test "update_layout/2 with valid data updates the layout" do
      layout = layout_fixture()
      assert {:ok, layout} = LayoutContext.update_layout(layout, @update_attrs)
      assert %Layout{} = layout
      assert layout.layout == "some updated layout"
    end

    test "update_layout/2 with invalid data returns error changeset" do
      layout = layout_fixture()
      assert {:error, %Ecto.Changeset{}} = LayoutContext.update_layout(layout, @invalid_attrs)
      assert layout == LayoutContext.get_layout!(layout.id)
    end

    test "delete_layout/1 deletes the layout" do
      layout = layout_fixture()
      assert {:ok, %Layout{}} = LayoutContext.delete_layout(layout)
      assert_raise Ecto.NoResultsError, fn -> LayoutContext.get_layout!(layout.id) end
    end

    test "change_layout/1 returns a layout changeset" do
      layout = layout_fixture()
      assert %Ecto.Changeset{} = LayoutContext.change_layout(layout)
    end
  end
end
