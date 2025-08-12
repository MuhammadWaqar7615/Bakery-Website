import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/color/colorSlice';
import { FaArrowLeft, FaHome } from "react-icons/fa";
import logo from "../../assets/bakery_logo.png";
import { Link, useNavigate } from 'react-router-dom';

export default function Admin() {
  const isLogedIn = JSON.parse(localStorage.getItem("isLogedIn"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentEmail = useSelector(state => state.color.currentEmail);
  const user = useSelector(state =>
    state.color.users.find(u => u.email === currentEmail)
  );

  const bgColor = user?.selectedBgColor || "#FFFFFF";
  const fontColor = user?.selectedFontColor || "#000000";
  const primaryColor = user?.selectedPrimaryColor || "#000000";
  const secondaryColor = user?.selectedSecondaryColor || "#FFFFFF";
  const adColor = user?.selectedAdColor || "#933C24";

  const [form, setForm] = useState({
    selectedBgColor: bgColor,
    selectedFontColor: fontColor,
    selectedPrimaryColor: primaryColor,
    selectedSecondaryColor: secondaryColor,
    selectedAdColor: adColor
  });

  useEffect(() => {
    if (isLogedIn) {
      if (user) {
        setForm({
          selectedBgColor: user.selectedBgColor,
          selectedFontColor: user.selectedFontColor,
          selectedPrimaryColor: user.selectedPrimaryColor,
          selectedSecondaryColor: user.selectedSecondaryColor,
          selectedAdColor: user.selectedAdColor
        });
      }
    } else {
      navigate('/');
    }
  }, [user]);

  const handleChange = (name) => (e) => {
    const newColor = e.target.value;

    setForm(prev => ({
      ...prev,
      [name]: newColor
    }));

    dispatch(updateUser({
      email: currentEmail,
      updates: {
        [name]: newColor
      }
    }));
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.setItem("isLogedIn", null);
    navigate("/");
  };

  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: form.selectedBgColor }}
    >
      <div className="min-h-screen flex flex-col md:flex-row">
        
        {/* Sidebar */}
        <div className="bg-[#191C20] w-full md:w-[280px] h-full flex flex-col p-4">
          <Link
            to={"/home"}
            className="text-white flex items-center mb-4 gap-2"
          >
            <FaArrowLeft /> <FaHome className="text-xl" />
          </Link>

          <div className="flex justify-center">
            <img
              src={logo}
              alt="Bakery Logo"
              className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 object-contain"
            />
          </div>

          <div className="mt-5 space-y-4">
            <ColorInput
              label="Background Color"
              name="selectedBgColor"
              value={form.selectedBgColor}
              onChange={handleChange("selectedBgColor")}
            />
            <ColorInput
              label="Font Color"
              name="selectedFontColor"
              value={form.selectedFontColor}
              onChange={handleChange("selectedFontColor")}
            />
            <ColorInput
              label="Primary Color"
              name="selectedPrimaryColor"
              value={form.selectedPrimaryColor}
              onChange={handleChange("selectedPrimaryColor")}
            />
            <ColorInput
              label="Secondary Color"
              name="selectedSecondaryColor"
              value={form.selectedSecondaryColor}
              onChange={handleChange("selectedSecondaryColor")}
            />
            <ColorInput
              label="Ad-Section Color"
              name="selectedAdColor"
              value={form.selectedAdColor}
              onChange={handleChange("selectedAdColor")}
            />
          </div>

          <div className="mt-auto pt-6 text-center">
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-600 to-red-800 bg-[length:200%_100%] bg-left hover:bg-right transition-all duration-500 text-white font-semibold px-5 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Preview Section - only on desktop */}
        <div
          className="hidden md:block flex-1 px-10 py-5 overflow-y-auto"
          style={{ backgroundColor: form.selectedBgColor }}
        >
          <div className="rounded-3xl border border-neutral-200 px-8 py-5 space-y-6 bg-[#933C24] shadow-black shadow-2xl backdrop-blur-lg">
            <h1
              className="text-3xl font-bold tracking-wide"
              style={{ color: form.selectedFontColor }}
            >
              Color Theme Preview
            </h1>

            <p className="text-lg" style={{ color: form.selectedFontColor }}>
              This area simulates your color scheme in action. All text reflects
              your selected colors.
            </p>

            <div className="p-6 rounded-xl bg-gray-900 shadow-amber-700 shadow-lg">
              <h2
                className="text-2xl font-semibold mb-2"
                style={{ color: form.selectedPrimaryColor }}
              >
                Primary Color in Use
              </h2>
              <p style={{ color: form.selectedFontColor }}>
                This text showcases the font color, while the heading uses your{" "}
                <strong>Primary Color</strong>.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-gray-900 shadow-amber-700 shadow-lg">
              <h2
                className="text-2xl font-semibold mb-2"
                style={{ color: form.selectedSecondaryColor }}
              >
                Secondary Color in Use
              </h2>
              <p style={{ color: form.selectedFontColor }}>
                This text uses your Font Color, and the heading uses your{" "}
                <strong>Secondary Color</strong>.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-gray-900 shadow-amber-700 shadow-lg text-center">
              <h2
                className="text-2xl font-semibold mb-2"
                style={{ color: form.selectedAdColor }}
              >
                Ad Section Styling
              </h2>
              <p style={{ color: form.selectedFontColor }}>
                Great for promos, banners, or highlights. The heading is your{" "}
                <strong>Ad Color</strong>.
              </p>
            </div>

            <div className="border-t pt-4 text-sm text-neutral-500">
              <p style={{ color: form.selectedFontColor }}>
                Want to tweak it? Adjust your color pickers on the left and watch
                this area update instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ColorInput({ label, name, value, onChange }) {
  return (
    <div className="py-3 flex justify-between items-center border-dashed border-b border-b-neutral-700">
      <label className="text-white text-sm sm:text-base">{label}:</label>
      <input type="color" name={name} value={value} onChange={onChange} />
    </div>
  );
}
