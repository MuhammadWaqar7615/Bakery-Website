import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../../index.css";
import bgImage from "../../assets/background_image.jpg";
import logo from "../../assets/bakery_logo.png";
import adImage from "../../assets/adImage.png";
import adImage2 from "../../assets/adImage2.png";
import explore1 from "../../assets/explore_product1.jpg";
import explore2 from "../../assets/explore_product2.jpg";
import explore3 from "../../assets/explore_product3.jpg";
import explore4 from "../../assets/explore_product4.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, setCurrentEmail } from '../../redux/color/colorSlice';
import { ImCross } from "react-icons/im";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogedIn = JSON.parse(localStorage.getItem('isLogedIn'));

  useEffect(() => {
    if (!isLogedIn) {
      navigate('/login');
    } else {
      dispatch(setCurrentEmail(isLogedIn));
      dispatch(updateUser({ email: isLogedIn, updates: {} }));
    }
  }, []);

  const currentEmail = useSelector(state => state.color.currentEmail);
  const user = useSelector(state => state.color.users.find(u => u.email === currentEmail));

  const bgColor = user?.selectedBgColor || "#FFFFFF";
  const fontColor = user?.selectedFontColor || "#000000";
  const primaryColor = user?.selectedPrimaryColor || "#000000";
  const secondaryColor = user?.selectedSecondaryColor || "#FFFFFF";
  const adColor = user?.selectedAdColor || "#FFFFFF";

  const [cardArr, setCardArr] = useState(user?.cards || [true, true, true, true]);

  const handleCard = (event) => {
    const index = parseInt(event.currentTarget.dataset.index);
    const updated = [...cardArr];
    updated[index] = false;
    setCardArr(updated);


    dispatch(updateUser({
      email: currentEmail,
      updates: {},
      cards: updated
    }));
  };

  return (
    <div style={{ backgroundColor: bgColor }}>
      <div className='min-h-screen bg-cover bg-center' style={{ backgroundImage: `url(${bgImage})` }}>
        <header className='flex items-center justify-between px-5 py-4 relative'>
          <img src={logo} alt="Logo" className='w-[100px]' />
          <ul className="hidden md:flex space-x-8 font-semibold text-base" style={{ color: fontColor }}>
            <li className="hover:text-amber-700 cursor-pointer">Home</li>
            <li className="hover:text-amber-700 cursor-pointer">Blog</li>
            <li className="hover:text-amber-700 cursor-pointer">Contact Us</li>
            <li className="hover:text-amber-700 cursor-pointer">Service</li>
          </ul>
          <button onClick={() => setMenuOpen(true)} className="md:hidden text-3xl" style={{ color: fontColor }}>
            ☰
          </button>
          <div className="hidden md:block">
            <button style={{ color: fontColor }} className='bg-[#933C24] px-4 py-1 rounded-sm hover:bg-[#6e2916] transition'>
              <Link to="/admin">Admin</Link>
            </button>
          </div>
        </header>

        <div className={`fixed top-0 left-0 h-full w-2/3 shadow-lg z-50 transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`} style={{ backgroundColor: bgColor }}>
          <div className="flex justify-between items-center p-4 border-b">
            <span className="font-bold text-lg" style={{ color: fontColor }}>Menu</span>
            <button onClick={() => setMenuOpen(false)} className="text-2xl">×</button>
          </div>
          <ul className="flex flex-col space-y-4 p-4 font-semibold" style={{ color: fontColor }}>
            <li onClick={() => setMenuOpen(false)} className="hover:text-amber-700 cursor-pointer">Home</li>
            <li onClick={() => setMenuOpen(false)} className="hover:text-amber-700 cursor-pointer">Blog</li>
            <li onClick={() => setMenuOpen(false)} className="hover:text-amber-700 cursor-pointer">Contact Us</li>
            <li onClick={() => setMenuOpen(false)} className="hover:text-amber-700 cursor-pointer">Service</li>
            <Link to="/admin">
              <button className='bg-[#933C24] px-4 py-1 mt-4 rounded-sm text-white hover:bg-[#6e2916] transition'>Admin</button>
            </Link>
          </ul>
        </div>

        <section className="px-5 mt-20">
          <aside className='flex flex-col justify-center md:pl-28'>
            <span className="font-semibold my-3" style={{ color: fontColor }}>Delicious Cafe</span>
            <h2 className='text-4xl md:text-5xl font-bold' style={{ color: secondaryColor }}>
              <span className='block'>Sweet Treats,</span>
              <span className='block'>Perfect Eats</span>
            </h2>
            <div style={{ color: fontColor }} className='mt-10 flex items-center gap-4'>
              <button style={{ color: fontColor }} className='bg-[#933C24] px-4 py-2 rounded-sm hover:bg-[#6e2916] transition'>Visit Here</button>
              <p className='cursor-pointer hover:text-amber-700'>Learn More</p>
            </div>
          </aside>
        </section>
      </div>

      {/* Cards */}
      <section className='my-20 px-0'>
        <h1 className='text-4xl md:text-5xl font-bold text-center my-10' style={{ color: primaryColor }}>Explore More</h1>
        <div className="flex md:flex-wrap flex-nowrap overflow-x-auto px-4 gap-4 md:gap-6 scroll-smooth snap-x snap-mandatory md:justify-center">

          {cardArr[0] && (
            <div className='w-[260px] md:w-[280px] h-[400px] rounded-lg bg-cover relative transition-transform duration-300 snap-center shrink-0 transform scale-95 md:scale-100 hover:scale-105' style={{ backgroundImage: `url(${explore1})` }}>
              <div className='flex justify-between'>
                <div className='w-40 h-20 bg-[#933C24] z-10 flex flex-col justify-center items-center bg-gradient-to-br from-[#933c24] to-[#e48f3a]'>
                  <span className='text-3xl font-bold' style={{ color: fontColor }}>$4</span>
                  <span className='font-semibold' style={{ color: fontColor }}>Cup Cake</span>
                </div>
                <div className='z-11 opacity-100 p-3' onClick={handleCard} data-index="0">
                  <ImCross className="text-white opacity-100 cursor-pointer hover:scale-110" />
                </div>
              </div>
              <div className="absolute inset-0 rounded-lg bg-gray-800/70" />
              <div className="absolute bottom-0 z-10 p-4 text-white w-full">
                <h2 className="text-xl font-bold my-2" style={{ color: secondaryColor }}>Ferrero Rocher Cupcake</h2>
                <p style={{ color: fontColor }} className="text-sm">Indulge in luxury with our Ferrero Rocher Cupcake — a rich hazelnut-chocolate base topped with Nutella buttercream.</p>
              </div>
            </div>
          )}

          {cardArr[1] && (
            <div className='w-[260px] md:w-[280px] h-[400px] rounded-lg bg-cover relative transition-transform duration-300 snap-center shrink-0 transform scale-95 md:scale-100 hover:scale-105' style={{ backgroundImage: `url(${explore2})` }}>
              <div className='flex justify-between'>
                <div className='w-40 h-20 bg-[#933C24] z-10 flex flex-col justify-center items-center bg-gradient-to-br from-[#933c24] to-[#e48f3a]'>
                  <span className='text-3xl font-bold' style={{ color: fontColor }}>$45</span>
                  <span className='font-semibold' style={{ color: fontColor }}>Birthday Cake</span>
                </div>
                <div className='z-11 opacity-100 p-3' onClick={handleCard} data-index="1">
                  <ImCross className="text-white opacity-100 cursor-pointer hover:scale-110" />
                </div>
              </div>
              <div className="absolute inset-0 rounded-lg bg-gray-800/70" />
              <div className="absolute bottom-0 z-10 p-4 text-white w-full">
                <h2 className="text-xl font-bold my-2" style={{ color: secondaryColor }}>Classic Birthday Cake</h2>
                <p style={{ color: fontColor }} className="text-sm">Layers of moist vanilla or chocolate sponge with buttercream, perfect for any celebration!</p>
              </div>
            </div>
          )}

          {cardArr[2] && (
            <div className='w-[260px] md:w-[280px] h-[400px] rounded-lg bg-cover relative transition-transform duration-300 snap-center shrink-0 transform scale-95 md:scale-100 hover:scale-105' style={{ backgroundImage: `url(${explore3})` }}>
              <div className='flex justify-between'>
                <div className='w-40 h-20 bg-[#933C24] z-10 flex flex-col justify-center items-center bg-gradient-to-br from-[#933c24] to-[#e48f3a]'>
                  <span className='text-3xl font-bol' style={{ color: fontColor }}>$6</span>
                  <span className='font-semibold' style={{ color: fontColor }}>Swiss Roll</span>
                </div>
                <div className='z-11 opacity-100 p-3' onClick={handleCard} data-index="2">
                  <ImCross className="text-white opacity-100 cursor-pointer hover:scale-110" />
                </div>
              </div>
              <div className="absolute inset-0 rounded-lg bg-gray-800/70" />
              <div className="absolute bottom-0 z-10 p-4 text-white w-full">
                <h2 className="text-xl font-bold my-2" style={{ color: secondaryColor }}>Chocolate Swiss Roll</h2>
                <p style={{ color: fontColor }} className="text-sm">Moist roll filled with chocolate cream and covered in whipped frosting.</p>
              </div>
            </div>
          )}

          {cardArr[3] && (
            <div className='w-[260px] md:w-[280px] h-[400px] rounded-lg bg-cover relative transition-transform duration-300 snap-center shrink-0 transform scale-95 md:scale-100 hover:scale-105' style={{ backgroundImage: `url(${explore4})` }}>
              <div className='flex justify-between'>
                <div className='w-40 h-20 bg-[#933C24] z-10 flex flex-col justify-center items-center bg-gradient-to-br from-[#933c24] to-[#e48f3a]'>
                  <span className='text-3xl font-bold'>$5</span>
                  <span className='font-semibold'>Cornish Pasty</span>
                </div>
                <div className='z-11 opacity-100 p-3' onClick={handleCard} data-index="3">
                  <ImCross className="text-white opacity-100 cursor-pointer hover:scale-110" />
                </div>
              </div>
              <div className="absolute inset-0 rounded-lg bg-gray-800/70" />
              <div className="absolute bottom-0 z-10 p-4 text-white w-full">
                <h2 className="text-xl font-bold my-2" style={{ color: secondaryColor }}>Cornish Pasty</h2>
                <p style={{ color: fontColor }} className="text-sm">Tender beef, potatoes and onions wrapped in flaky pastry — comfort in every bite.</p>
              </div>
            </div>
          )}

        </div>
      </section>


      <section>
        <div className="bg-gray-300 pt-10 px-4 flex flex-col lg:flex-row justify-between items-center gap-6">
          <img src={adImage} alt="" className="w-[200px]" />
          <div className="text-center max-w-md">
            <h1 className="font-extrabold text-2xl md:text-3xl italic" style={{ color: primaryColor }}>20% Off Your</h1>
            <h1 className="font-extrabold text-2xl md:text-3xl italic" style={{ color: primaryColor }}>First Order</h1>
            <p className="my-5 text-sm md:text-base" style={{ color: adColor }}>
              Visit us today and indulge in handcrafted goodness made with love.
            </p>
            <button style={{ color: fontColor }} className="bg-[#933C24] font-medium px-4 py-2 rounded-sm hover:bg-[#6e2916] transition">
              Learn More
            </button>
          </div>
          <img src={adImage2} alt="" className="w-[200px]" />
        </div>
      </section>
    </div>
  );
}
