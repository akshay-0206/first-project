import React from "react";

const home = () => {
  return (
    <div className="flex h-screen justify-center items-center bg-blue-200">
      <div className="bg-red-300 p-8">
        <div className="bg-green-300 p-8">
          <div className="bg-blue-300 p-8">
            <div className="bg-red-300 p-8">
              <div className="bg-green-300 p-8">
                <div className="bg-blue-300 p-8">
                  <div className="bg-red-300 p-8">
                    <div className="bg-green-300 p-8">
                      <div className="bg-white">
                        <h1 className="text-3xl italic p-4">
                          Hello, You are sucessfully logged In
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default home;
