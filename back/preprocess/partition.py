import os
import shutil


def distribute(input_path, output_path, client1, client2, client3, client4):
    tumor = []
    no_tumor = []
    for filename in os.listdir(input_path + "//tumor"):
        tumor.append(filename)
    for filename in os.listdir(input_path + "//no_tumor"):
        no_tumor.append(filename)
    tumor_img = dict()
    tumor_img["client1"] = round(len(tumor) * client1)
    tumor_img["client2"] = round(len(tumor) * client2)
    tumor_img["client3"] = round(len(tumor) * client3)
    tumor_img["client4"] = round(len(tumor) * client4)
    print(tumor_img)
    no_tumor_img = dict()
    no_tumor_img["client1"] = round(len(no_tumor) * client1)
    no_tumor_img["client2"] = round(len(no_tumor) * client2)
    no_tumor_img["client3"] = round(len(no_tumor) * client3)
    no_tumor_img["client4"] = round(len(no_tumor) * client4)
    print(no_tumor_img)

    s = 0
    i=0

    for filename in no_tumor:
        i=i+1
        print(i)
        if i <= no_tumor_img["client1"] :
            shutil.copy(input_path + "//no_tumor//" + filename, output_path + "//client1//no_tumor//" + filename)
            s=s+1
            #print("client 1 in process")
        elif i> s and i<= no_tumor_img["client1"]+no_tumor_img["client2"]:
            shutil.copy(input_path + "//no_tumor//" + filename, output_path + "//client2//no_tumor//" + filename)
            s = s + 1
            #print("client 2 in process")

        elif i> s and i<= no_tumor_img["client1"]+no_tumor_img["client2"]+no_tumor_img["client3"]:
            shutil.copy(input_path + "//no_tumor//" + filename, output_path + "//client3//no_tumor//" + filename)
            s = s + 1
            #print("client 3 in process")
            #print("i",i,"s",s)
        elif i>= no_tumor_img["client1"]+no_tumor_img["client2"]+no_tumor_img["client3"] -1 :
            shutil.copy(input_path + "//no_tumor//" + filename, output_path + "//client4//no_tumor//" + filename)
            #print("client 4 in process")

    s = 0
    i = 0
    for filename in tumor:
        i = i + 1
        if i <= tumor_img["client1"]:
            shutil.copy(input_path + "//tumor//" + filename, output_path + "//client1//tumor//" + filename)
            s = s + 1
            print()
        elif i > s and i <= tumor_img["client1"] + tumor_img["client2"]:
            shutil.copy(input_path + "//tumor//" + filename, output_path + "//client2//tumor//" + filename)
            s = s + 1

        elif i > s and i <= tumor_img["client1"] + tumor_img["client2"] + tumor_img["client3"]:
            shutil.copy(input_path + "//tumor//" + filename, output_path + "//client3//tumor//" + filename)
            s = s + 1
        elif i >= tumor_img["client1"] + tumor_img["client2"] + tumor_img["client3"] -1 :
            shutil.copy(input_path + "//tumor//" + filename, output_path + "//client4//tumor//" + filename)


distribute("C:\\Users\\user\\PFE\\pfe1\\pfe1\\output1\\val", "C:\\Users\\user\\PFE\\pfe1\\pfe1\\FL_Dataset2", 0.25, 0.25, 0.25, 0.25)