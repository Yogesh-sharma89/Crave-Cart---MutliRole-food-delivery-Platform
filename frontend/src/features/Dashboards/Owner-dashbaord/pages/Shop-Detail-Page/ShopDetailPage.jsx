import { useMemo, useState } from "react";
import AddItemModal from "./components/AddItemModal";
import ItemCard from "./components/ItemCard";
import ReadItemModal from "./components/ReadItemModal";
import ShopHero from "./components/ShopHero";
import ItemsToolbar from "./components/ItemsToolbar";
import { motion } from "framer-motion"
import FullScreenLoader from "../../../../../features/auth/components/Loader"
import EmptyState from "./components/EmptyState";
import useUiStore from "../../../../../store/ui.store";
import useGetShopItems from "./hook/useShopItem";
import ItemCardSkeleton from "./components/ItemCardSkeleton";
import useDeleteShopItem from "./hook/useDeleteShopItem";
import DeleteItemDialog from "./components/DeleteItemDialog";
import { toast } from "sonner";
import useGetShop from "../../hooks/useGetShop";
import { useParams } from "react-router";


function ShopDetailPage() {

   const { shopId } = useParams();

  const {data:currentShop,isLoading:shopLoading} = useGetShop(shopId);

  const {data:items=[],isLoading} = useGetShopItems(shopId);

  const {openCreateModal,isAddShopModalOpen,closeModal,openEditModal} = useUiStore();

  const [query, setQuery] = useState("");

  const [readItem, setReadItem] = useState(null);

  const [itemToDelete,setItemToDelete] = useState(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return items;

    const q = query.trim().toLowerCase();

    return items?.filter(
      (it) =>
        it.itemName.toLowerCase().includes(q) ||
        it.category.name.toLowerCase().includes(q)
    );
  }, [items, query]);

  const {mutateAsync:deleteMutation,isPending} = useDeleteShopItem();

  const handleDeleteClick = (item)=>{
    setItemToDelete(item);
    setReadItem(null);
  }

  const handleCloseDelete = ()=>{
    setItemToDelete(null);
  }

  const handleConfirmDelete = async()=>{
    if(!itemToDelete) return;

    try{

      await deleteMutation({
        itemId:itemToDelete._id,
        shopId:currentShop._id
      })

      toast.success("Item deleted ✅");
      setItemToDelete(null);

    }catch(err){
        toast.error("Failed to delete item ❌");
    }

  }

  const isScreenLoading  = shopLoading || (isLoading && !currentShop?._id);

  if(isScreenLoading){
    return <FullScreenLoader text="Loading shop and it's menu..."/>
  }

  return (
    <div className="min-h-screen bg-app-bg font-(--font-sans) pb-16">
      <ShopHero shop={currentShop} itemCount={items?.length} />

      <div className="mx-4 mt-8 sm:mx-8">
        <ItemsToolbar
          query={query}
          setQuery={setQuery}
          count={items.length}
          onAddClick={openCreateModal}
        />

        <motion.div
          layout
          className="grid grid-cols-1 gap-5 py-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >

          {isLoading ? 

          Array.from({length:4}).map((_,i)=>(
            <ItemCardSkeleton key={i} index={i}/>
          ))
          :
          filtered.length === 0 ? (
            <EmptyState
              hasQuery={query.trim().length > 0}
              onAddClick={openCreateModal}
            />
          ) : (
            filtered.map((item, i) => (
              <ItemCard
                key={item._id}
                item={item}
                index={i}
                onRead={setReadItem}
                onEdit={openEditModal}
                onDelete={handleDeleteClick}
              />
            ))
          )}
        </motion.div>
      </div>

      <AddItemModal
        open={isAddShopModalOpen}
        onClose={closeModal}
      />

      {/* //delete dialog  */}

      <DeleteItemDialog
       isOpen={Boolean(itemToDelete)}
       onClose={handleCloseDelete}
       item={itemToDelete}
       isPending={isPending}
       onConfirm={handleConfirmDelete}
      />

      <ReadItemModal
        item={readItem}
        onClose={() => setReadItem(null)}
        onEdit={()=>{
          openEditModal(readItem);
          setReadItem(null);
        }}
        onDelete={handleDeleteClick}
      />
    </div>
  );
}

export default ShopDetailPage