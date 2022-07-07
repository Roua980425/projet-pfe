import argparse
import os
import shutil
parser = argparse.ArgumentParser(description='Test.')
parser.add_argument('--input', action='store', type=str, help='input path')
parser.add_argument('--output', action='store', type=str, help='output path')
parser.add_argument('--cl1Id', action='store', type=str, help='client id ')
parser.add_argument('--cl2Id', action='store', type=str, help='client id ')
parser.add_argument('--cl3Id', action='store', type=str, help='client id ')
parser.add_argument('--cl4Id', action='store', type=str, help='client id ')
parser.add_argument('--fraction1', action='store', type=float, help='fraction of the client id ')
parser.add_argument('--fraction2', action='store', type=float, help='fraction of the client id ')
parser.add_argument('--fraction3', action='store', type=float, help='fraction of the client id ')
parser.add_argument('--fraction4', action='store', type=float, help='fraction of the client id ')
args = parser.parse_args()
input_path, output_path,cl_id1,cl_id2,cl_id3,cl_id4, fraction1, fraction2, fraction3, fraction4 =vars(args)['input'],vars(args)['output'],vars(args)['cl1ID'],vars(args)['cl2ID'],vars(args)['cl3ID'],vars(args)['cl4ID'],vars(args)['fraction1'],vars(args)['fraction2'],vars(args)['fraction3'],vars(args)['fraction4']


parser.add_argument('--port', action='store', type=int, help='client port')

def distribute(input_path, output_path,cl_id1,cl_id2,cl_id3,cl_id4,client1, client2, client3, client4):
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
            shutil.copy(input_path + "//no_tumor//" + filename, output_path + "//"+cl_id1+"//no_tumor//" + filename)
            s=s+1
            #print("client 1 in process")
        elif i> s and i<= no_tumor_img["client1"]+no_tumor_img["client2"]:
            shutil.copy(input_path + "//no_tumor//" + filename, output_path + "//"+cl_id2+"//no_tumor//" + filename)
            s = s + 1
            #print("client 2 in process")

        elif i> s and i<= no_tumor_img["client1"]+no_tumor_img["client2"]+no_tumor_img["client3"]:
            shutil.copy(input_path + "//no_tumor//" + filename, output_path + "//"+cl_id3+"//no_tumor//" + filename)
            s = s + 1
            #print("client 3 in process")
            #print("i",i,"s",s)
        elif i>= no_tumor_img["client1"]+no_tumor_img["client2"]+no_tumor_img["client3"] -1 :
            shutil.copy(input_path + "//no_tumor//" + filename, output_path + "//"+cl_id4+"//no_tumor//" + filename)
            #print("client 4 in process")

    s = 0
    i = 0
    for filename in tumor:
        i = i + 1
        if i <= tumor_img["client1"]:
            shutil.copy(input_path + "//tumor//" + filename, output_path + "//"+cl_id1+"//tumor//" + filename)
            s = s + 1
            print()
        elif i > s and i <= tumor_img["client1"] + tumor_img["client2"]:
            shutil.copy(input_path + "//tumor//" + filename, output_path + "//"+cl_id2+"//tumor//" + filename)
            s = s + 1

        elif i > s and i <= tumor_img["client1"] + tumor_img["client2"] + tumor_img["client3"]:
            shutil.copy(input_path + "//tumor//" + filename, output_path + "//"+cl_id3+"//tumor//" + filename)
            s = s + 1
        elif i >= tumor_img["client1"] + tumor_img["client2"] + tumor_img["client3"] -1 :
            shutil.copy(input_path + "//tumor//" + filename, output_path + "//"+cl_id4+"//tumor//" + filename)
    print("process finished")


distribute(input_path, output_path,cl_id1,cl_id2,cl_id3,cl_id4, fraction1, fraction2, fraction3, fraction4)