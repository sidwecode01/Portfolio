


export default function About(){
    return(
        <div className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center p-6">
  <div className="bg-gray-50 dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden max-w-4xl w-full grid md:grid-cols-2">
    
    
    <div className="h-64 md:h-auto">
      <img src="https://www.allrecipes.com/thmb/SoBuPU73KcbYHl3Kp3j8Xx4A3fc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8805-CrispyFriedChicken-mfs-3x2-072-d55b8406d4ae45709fcdeb58a04143c2.jpg" alt="Delicious Recipe" className="w-full h-full object-cover"/>
    </div>

    
    <div className="p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-3xl font-bold font-serif text-gray-800 dark:text-white mb-2">Creamy Garlic Chicken</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">A rich and savory chicken recipe perfect for dinner nights.</p>

       
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-teal-600 dark:text-teal-400 mb-2">Ingredients</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-200 text-sm">
            <li>2 chicken breasts</li>
            <li>4 cloves garlic, minced</li>
            <li>1 cup heavy cream</li>
            <li>1 tsp paprika</li>
            <li>Salt and pepper to taste</li>
          </ul>
        </div>

      
        <div>
          <h3 className="text-xl font-semibold text-teal-600 dark:text-teal-400 mb-2">Instructions</h3>
          <ol className="list-decimal pl-5 space-y-1 text-gray-700 dark:text-gray-200 text-sm">
            <li>Season the chicken and sear until golden.</li>
            <li>Add garlic and sauté until fragrant.</li>
            <li>Pour in cream and let it simmer.</li>
            <li>Return chicken and cook until done.</li>
            <li>Garnish and serve hot.</li>
          </ol>
        </div>
      </div>

     
      <div className="mt-6 text-right">
        <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2 rounded-lg transition">Try Now</button>
      </div>
    </div>
  </div>
</div>
    )
}