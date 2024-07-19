const Navbar = () => {
  return (
<header className="text-white body-font bg-[#405D72]">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
      <a className="mr-5 ">First Link</a>
      <a className="mr-5 ">Second Link</a>
      <a className="mr-5 ">Third Link</a>
      <a >Fourth Link</a>
    </nav>
    <a className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
      <span className="ml-3 text-2xl text-white">User Credentials</span>
    </a>
    <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
      <button className="inline-flex items-center bg-[#758694] border-0 py-1 px-3 focus:outline-none hover:bg-[#758694] rounded text-base mt-4 md:mt-0">Button
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 ml-1" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</header>

  )
}

export default Navbar
