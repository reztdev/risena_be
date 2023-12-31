PGDMP         %    
        
    {            risena_store    15.4    15.4     %           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            &           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            '           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            (           1262    16399    risena_store    DATABASE     x   CREATE DATABASE risena_store WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';
    DROP DATABASE risena_store;
                postgres    false            �            1259    16425    images    TABLE     ?  CREATE TABLE public.images (
    images_id character varying(100) NOT NULL,
    images_filename character varying(100),
    images_size character varying(100),
    images_path character varying(100),
    images_mimetype character varying(50),
    images_url character varying(200),
    id_products character varying
);
    DROP TABLE public.images;
       public         heap    postgres    false            �            1259    16400    products    TABLE     �  CREATE TABLE public.products (
    id_products character varying(100) NOT NULL,
    products_name character varying(255) NOT NULL,
    products_price character varying(255) NOT NULL,
    products_description character varying(1000),
    products_stock character varying(100) NOT NULL,
    products_category character varying(255),
    products_image character varying(500),
    products_slug character varying
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    16407    users    TABLE       CREATE TABLE public.users (
    id_users character varying NOT NULL,
    users_name character varying,
    users_email character varying NOT NULL,
    users_password character varying NOT NULL,
    users_image character varying,
    users_role character varying DEFAULT USER
);
    DROP TABLE public.users;
       public         heap    postgres    false            "          0    16425    images 
   TABLE DATA                 public          postgres    false    216                     0    16400    products 
   TABLE DATA                 public          postgres    false    214   �       !          0    16407    users 
   TABLE DATA                 public          postgres    false    215   �       �           2606    16467    images images_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (images_id);
 <   ALTER TABLE ONLY public.images DROP CONSTRAINT images_pkey;
       public            postgres    false    216            �           2606    16406    products products_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id_products);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    214            �           2606    16424    users users_email_unique 
   CONSTRAINT     Z   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (users_email);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_unique;
       public            postgres    false    215            �           2606    16413    users users_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id_users);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    215            �           2606    16473    images id_products_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.images
    ADD CONSTRAINT id_products_fk FOREIGN KEY (id_products) REFERENCES public.products(id_products) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 ?   ALTER TABLE ONLY public.images DROP CONSTRAINT id_products_fk;
       public          postgres    false    214    216    3210            "   �  x���M�A���
nhbAUV�'C�k�^I.�I`��=��@F�%�f�kޮ�I�������x~��e�=��*MW?�cٍ�����~�f���Tă�`02�R-��dl��Oȉy�	Y�r�������L!z����n�y7�_��f^��}w3�m�)l�����"�윘�BfN�R� s�����xe���h��2�km7X���ā�v���D���hH��f9��=[3�`��"	9W����� ����f�R�BΠ$*����
�!Y��]��[�����p���q��Ϛ�]y�����M��cI�y�т��p ��v��_ob,[g`v��?Jy70;C����ɥ�T&���W`bR���Lzo�rjL�Mg���(�%&�b�=�w�f�aq��a��ڋ�OC�H��6�ڃ���5pv��0VU�1�8�7sX`�(���Ok/�?9�~4�W��          �   x���MO�@�������cv�-�OM�1�Tϳ5�,��[�Z�Ӽ�|=ST��KEU?�0�S�����n��n7��vw%��Z�R&,gG�2k�;H��"l�'�a�q�4[�*�]�[�N}���8���5�;P�i�'/Yu(ˋ��F�g\7!ύ�\��K#�ۇ���[Ƈ�	�QxnP
bh�(�F��|=_�o�5qe�����f��4҄k����Y�0&�'�;km      !   X  x���Mo�0�{?�Hl�&�c�v'�AZh!+$@� ���$���O?����@�<�����ǽ��Y���2ky�&�׬�A��Mگ�1�}�ˀP�@) �ŀ#����������Z]��_}(���ZFI��֗]E�,ő��ZH(�N��ߗ-�>o�c|8;��36���=n+��;<�q|��ϫ��3i��-_���"��i:��rɪ,�UM2O&�l[>P�Z�I&���t��BgB� C� �x�1�4،���ׯ�����]�2�qH ��{D B�s��>�]���YO?��pK�z��G��2Nwϝ>�J<sy�56�1g������~t扞�Tgl�R��a�WƵ,ĺ`�O�w��#�0_0�>x�U��B��� 2��| u �� ���$���G����];��fv17���S�T�t�K�v8LNC޵�������:�=w`X���bjifW3�c�W��O��iTJ���w���ש@L�s�sk=�p��y�A��'����T^��t�
���.S��r��s���lЛB���.��6�	>�P��^�4Xd<Swi��"w�S�D�H��B>���qw�yGM�     