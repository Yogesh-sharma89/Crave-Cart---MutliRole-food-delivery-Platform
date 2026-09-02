
import { useState } from 'react';
import useLocationStore from '../../../../../store/location.store';
import FullScreenLoader from '../../../../auth/components/Loader';
import useAuthUser from '../../../../auth/hooks/useAuthUser';
import Navbar from '../../../../home/Navbar'
import CategorySlider from '../components/CategorySlider';
import WelcomeSection from '../components/WelcomeSection';
import useCategories from '../../../Owner-dashbaord/pages/Shop-Detail-Page/hook/useGetCategory';
import CategorySkeleton from '../components/common/CatergorySkeleton';

const UserDashboard = () => {

  const { data: user, isLoading } = useAuthUser();
  const { location } = useLocationStore();

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCatergorySelect = (catergory) => {
    setSelectedCategory(catergory?._id)
  }

  const { categories, isLoading: categoriesLoading } = useCategories();

  if (isLoading) {
    return <FullScreenLoader text='Loading User Dashbaord...' />
  }

  return (
    <div className='min-h-screen scrollbar-none'>
      <Navbar />
      <main className='mx-auto max-w-6xl py-8'>

        <WelcomeSection
          userName={user?.fullname}
          location={location?.city}
          onExplore={() => {
            console.log("Explore food");
          }}
        />

        <section className='mt-14 px-4'>
          {
            categoriesLoading ? 
             <CategorySkeleton />
              :
              <CategorySlider
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={handleCatergorySelect}
              />
          }
        </section>

      </main>
    </div>
  )
}

export default UserDashboard
